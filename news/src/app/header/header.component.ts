import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../service/category.service';
import { ToolsService } from '../service/tools.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  categories = undefined;
  isMenuOpened = false;

  constructor(private categoryService: CategoryService, private toolsService: ToolsService) {

  }

  ngOnInit() {
    this.getCategories();
  }

  public goToCategory(category) {
    this.toolsService.refreshComponent(category);
    this.isMenuOpened = false;
  }

  public getCategories() {
    this.categoryService.getCategoriesResponse()
      .subscribe((categoriesResponse) => {
        this.categoryService.storeCategoriesToService(categoriesResponse.json());
        this.getCategoriesList();
      });
  }

  public getCategoriesList() {
    this.categoryService.categories.subscribe((categories) => {
      if (this.categories === undefined) {
          this.categories = categories;
      }
    }
    );
  }

  goToHomepage() {
    this.toolsService.navigateToPage('/');
    this.isMenuOpened = false;
  }

  menuOpenClose() {
    this.isMenuOpened = this.isMenuOpened !== true;
  }
}
