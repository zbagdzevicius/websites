import { Router } from '@angular/router';
import { ToolsService } from './../service/tools.service';
import { Component, OnInit } from '@angular/core';
import { PostService } from '../service/post.service';

@Component({
  selector: 'app-new-posts',
  templateUrl: './new-posts.component.html'
})
export class NewPostsComponent implements OnInit {

  newPosts;
  numberOfPosts = 12;

  constructor(private postService: PostService, private toolsService: ToolsService) {
  }

  ngOnInit() {
    this.getNewPosts();
  }

  public getNewPosts() {
    this.postService.getNewPosts(this.numberOfPosts)
      .subscribe((Posts) => {
        this.newPosts = Posts.json();
        for (const post of this.newPosts) {
          post['date'] = post['date'].substring(0, 10);
        }
      }
      );
  }

  public goToPagePost(slug) {
    this.toolsService.goToPageWithRefresh(slug);
  }
}
