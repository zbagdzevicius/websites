import { Injectable } from '@angular/core';
import { WpApiMedia, WpApiPosts, WpApiTerms } from 'wp-api-angular';
import { HttpClient } from '@angular/common/http';
import { Meta } from '@angular/platform-browser';


@Injectable()
export class PostService {

  constructor(private wpApiPosts: WpApiPosts,
    private wpApiMedia: WpApiMedia,
    private meta: Meta) {
  }

  public getPostsListByCategory(postsPerPage, currentPage, categoryID) {
    return this.wpApiPosts.getList({
      'search': {
        'categories': Number(categoryID),
        'per_page': postsPerPage,
        'page': currentPage
      }
    });
  }

  public getNewPosts(numberOfPosts) {
    return this.wpApiPosts.getList({
      'search': {
        'per_page': numberOfPosts,
        'page': 1
      }
    });
  }

  public getPostWithImage(post, size) {
    if (post['featured_media'] !== 0) {
      this.wpApiMedia.get(post['featured_media'])
        .subscribe(pictureSrc => {
          if (pictureSrc.json().media_details.hasOwnProperty('sizes')) {
            post['picture'] = pictureSrc.json()['media_details']['sizes'][size]['source_url'];
          }
        });
    }
    return post;
  }

  public getPostWithOriginalImage(post) {
    if (post['featured_media'] !== 0) {
      this.wpApiMedia.get(post['featured_media'])
        .subscribe(pictureSrc => {
          if (pictureSrc.json().hasOwnProperty('source_url')) {
            post['picture'] = pictureSrc.json()['source_url'];
            this.updateMetaTags(post.title.rendered, post.picture, post.excerpt.rendered);
          }
        });
    }
    return post;
  }

  public updateMetaTags(title, image, description) {
    this.meta.updateTag({ name: 'og:title', content: title });
    this.meta.updateTag({ name: 'og:description', content: description });
    this.meta.updateTag({ name: 'og:image', content: image });
    this.meta.updateTag({ name: 'og:image:type', content: 'image/png' });
  }

  public getPostBySlug(slug) {
    return this.wpApiPosts.getList({ 'search': { 'slug': slug } });
  }

  public getTotalPages() {
    return this.wpApiPosts.getList({ 'search': { 'per_page': 1 } });
  }

  public getPagePosts(postsPerPage, currentPage) {
    return this.wpApiPosts.getList({ 'search': { 'per_page': postsPerPage, 'page': currentPage } });
  }

  public getNumberOfPages(posts) {
    return Number(posts.headers.get('x-wp-totalpages'));
  }
}
