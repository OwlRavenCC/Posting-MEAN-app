import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Post } from '../post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})

export class PostListComponent implements OnInit, OnDestroy {

  posts: Post[] = [];
  // postService: PostService;
  // 'Public creates 'postService' property and sets it'
  private postsSub: Subscription;
  constructor(public postService: PostService) {
    // this.postService = PostService;
  }

  ngOnInit() {
    this.posts = this.postService.getPosts();
    this.postsSub = this.postService.getPostsUpdatedListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
      });
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }

}


