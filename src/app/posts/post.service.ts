import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Subscriber } from 'rxjs';
import { map } from 'rxjs/operators';

import { Post } from './post.model';
import { identifierModuleUrl } from '@angular/compiler';

// This creates an instance in the main root app for the service to be used anywhere
@Injectable({providedIn: 'root'})
export class PostService {
  private posts: Post[] = [];
  // Propertyevent event when posts get updated
  private updatedPosts = new Subject<Post[]>();

  constructor(private http: HttpClient) {}

/**
 * --------------
 * GET POSTS
 * --------------
 */
  getPosts() {
    this.http.get<{ messages: string; posts: Post[]}>(
      'http://localhost:3000/api/posts'
    )
    .pipe(map((postData) => {
      return postData.posts.map(post => {
        return {
          title: post.title,
          content: post.content,
          // @ts-ignore
          id: post._id
        };
      });
    }))
    .subscribe((transformedPosts) => {
      this.posts = transformedPosts;
      // To avoid copying the pointer and altering the post array, this copies the entire array object in a new one.
      // It also prevents people of modifying the posts property inside.
      this.updatedPosts.next([...this.posts]);
    });
  }

  getPostsUpdatedListener() {
    return this.updatedPosts.asObservable();
  }

  getPost(id: string) {
    return this.http.get<{_id: string, title: string, content: string}>('http://localhost:3000/api/posts/' + id);
  }

/**
 * --------------
 * ADD POSTS
 * --------------
 */
  addPost(post: Post) {
    this.http.post<{message: string, postId: string}>('http://localhost:3000/api/posts', post)
      .subscribe(responseData => {
        console.log(responseData);
        const id = responseData.postId;
        post.id = id;
        this.posts.push(post);
        // This emmits a new value when it's updated to avoid staying with the same array all time from getPosts();
        this.updatedPosts.next([...this.posts]);
      });
  }

/**
 * --------------
 * Update POSTS
 * --------------
 */

 updatePost(post: Post) {
  this.http
    .put('http://localhost:3000/api/posts/' + post.id, post)
    .subscribe(response => {
      const Postsupdated = [...this.posts];
      const oldPostIndex = Postsupdated.findIndex(p => p.id === post.id);
      Postsupdated[oldPostIndex] = post;
      this.posts = Postsupdated;
      this.updatedPosts.next([...this.posts]);
    });
 }

  /**
 * --------------
 * DELETE POSTS
 * --------------
 */
  deletePost(postId: string) {
    this.http.delete('http://localhost:3000/api/posts/' + postId)
      .subscribe(() => {
        const updatedPosts = this.posts.filter(post => post.id !== postId);
        this.posts = updatedPosts;
        this.updatedPosts.next([...this.posts]);
      });
  }

}
