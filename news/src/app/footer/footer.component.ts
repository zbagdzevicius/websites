import { ToolsService } from './../service/tools.service';
import { CategoryService } from './../service/category.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {

  categories;

  constructor(private categoryService: CategoryService,
    private toolsService: ToolsService) { }

  ngOnInit() {
    this.getCategoriesList();
  }

  public getCategoriesList() {
    this.categoryService.categories
      .subscribe((categories) => {
        this.categories = categories;
      });
  }

  public goToCategory(category) {
    this.toolsService.refreshComponent(category);
  }
}
