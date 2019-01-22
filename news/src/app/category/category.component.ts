import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { PostService } from '../service/post.service';
import { ToolsService } from '../service/tools.service';
import { CategoryService } from '../service/category.service';
import { PagerService } from '../service/pager.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html'
})
export class CategoryComponent implements OnInit {
  posts;

  currentPage = 1;
  numberOfPages;
  postsPerPage = 10;
  currentCategoryID;
  currentCategorySlug;
  currentCategory;
  totalPages;

  pager;

  constructor(private postService: PostService,
    private tools: ToolsService,
    private categoryService: CategoryService,
    private pagerService: PagerService) {
  }

  ngOnInit() {
    this.loadCategory();
  }

  public loadCategory() {
    this.currentPage = this.tools.getCurrentPageFromUrl();
    this.categoryService.getCategoryBySlug(this.tools.getCategoryNameSlug())
      .subscribe(categoryMeta => {
        this.currentCategorySlug = categoryMeta.json()[0]['slug'];
        this.currentCategory = categoryMeta.json()[0]['name'];
        this.currentCategoryID = categoryMeta.json()[0]['id'];
        this.loadPagePosts(this.currentPage);
      });
  }

  public loadPagePosts(pageToLoad) {
    this.currentPage = pageToLoad;
    this.getCategoryPostsList();
    this.tools.navigateToPage(this.currentCategorySlug + '/' + this.currentPage);
  }

  public getCategoryPostsList() {
    this.postService.getPostsListByCategory(this.postsPerPage, this.currentPage, this.currentCategoryID)
      .subscribe((Posts) => {
        if (this.numberOfPages === undefined) {
          this.totalPages = this.postService.getNumberOfPages(Posts);
        }
        this.setPagination(this.currentPage);
        this.posts = Posts.json();
        for (const post of this.posts) {
          this.addImagesToPosts(post, 'thumbnail');
          post['date'] = post['date'].substring(0, 10);
        }
      }, (error => {
        this.loadPagePosts(1);
      }
        )) ;
  }

  public addImagesToPosts(post, size) {
    post = this.postService.getPostWithImage(post, size);
  }

  setPagination(page: number) {
    this.pager = this.pagerService.getPager(page, this.totalPages);
    this.numberOfPages = this.pager.pages;
  }
}
