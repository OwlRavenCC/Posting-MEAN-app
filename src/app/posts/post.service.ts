import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Post } from './post.model';

// This creates an instance in the main root app for the service to be used anywhere
@Injectable({providedIn: 'root'})
export class PostService {
  private posts: Post[] = [];
  // Propertyevent event when posts get updated
  private UpdatedPosts = new Subject<Post[]>();

  getPosts() {
    // To avoid copying the pointer and altering the post array, this copies the entire array object in a new one.
    // It also prevents people of modifying the posts property inside.
    return [...this.posts];
  }

  getPostsUpdatedListener() {
    return this.UpdatedPosts.asObservable();
  }

  addPost(post: Post) {
    this.posts.push(post);
    // This emmits a new value when it's updated to avoid staying with the same array all time from getPosts();
    this.UpdatedPosts.next([...this.posts]);
  }
}
