import { ToolsService } from './../service/tools.service';
import { PostService } from './../service/post.service';
import { CategoryService } from './../service/category.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  categories = [];
  categoryPosts = {};
  numberOfCategoryPosts = 1;


  constructor(private categoryService: CategoryService,
    private postService: PostService,
    private toolsService: ToolsService) {
  }

  ngOnInit() {
    this.getCategoriesAndPosts();
  }

  public goToCategory(category) {
    this.toolsService.refreshComponent(category);
  }

  public getCategoriesAndPosts() {
    this.categoryService.getCategoriesResponse()
      .subscribe((categoriesResponse) => {
        this.categoryService.storeCategoriesToService(categoriesResponse.json());
        this.getCategoriesList();
      });
  }

  public getCategoriesList() {
    this.categoryService.categories.subscribe((categories) => {
      if (this.categories.length === 0) {
        for (const category of categories) {
          const categoryID = category['id'];
          this.categories.push(category['name']);
          this.getCategoryPosts(categoryID, category['name']);
        }
      }
    }
    );
  }

  public getCategoryPosts(categoryID, categoryName) {
    let postsByCategory;
    this.postService.getPostsListByCategory(this.numberOfCategoryPosts, 1, categoryID)
      .subscribe((Posts) => {
        postsByCategory = Posts.json();
        for (const post of postsByCategory) {
          this.addImagesToPosts(post, 'thumbnail');
          post['date'] = post['date'].substring(0, 10);
        }
        for (const category of this.categories) {
          if (category === categoryName) {
            this.categoryPosts[category] = postsByCategory;
          }
        }
      }
      );
  }

  public addImagesToPosts(post, size) {
    post = this.postService.getPostWithImage(post, size);
  }


}
