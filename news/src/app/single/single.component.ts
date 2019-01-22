import { Component, OnInit } from '@angular/core';
import { PostService } from '../service/post.service';
import { ToolsService } from '../service/tools.service';
import { FacebookService, InitParams } from 'ngx-facebook';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html'
})
export class SingleComponent implements OnInit {
  post;
  familiarPosts;

  constructor(
    private postService: PostService,
    private toolsService: ToolsService,
    private fb: FacebookService,
    private meta: Meta) {

    const initParams: InitParams = {
      appId: '203614273497647',
      xfbml: true,
      version: 'v2.8'
    };

    this.fb.init(initParams);

  }

  ngOnInit() {
    this.getPostBySlug();
  }

  public getPostBySlug() {
    this.postService.getPostBySlug(this.toolsService.getPostSlugFromUrl())
      .subscribe(post => {
        this.post = post.json()[0];
        this.addImageToPost(this.post);
        this.post['date'] = this.post['date'].substring(0, 10);
      });
  }

  public addImageToPost(post) {
    post = this.postService.getPostWithOriginalImage(post);
  }

  public backToPreviousPage() {
    this.toolsService.backToPreviousPage();
  }

  public updateMetaTags(title, image) {
    this.meta.updateTag({ name: 'og:title', content: title });
    this.meta.updateTag({ name: 'og:image:url', content: image });
    this.meta.updateTag({ name: 'og:image:type', content: 'image/png' });
  }


}
