import { Injectable } from '@angular/core';
import { WpApiTerms } from 'wp-api-angular';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class CategoryService {

  private categoriesSource = new BehaviorSubject('');
  categories = this.categoriesSource.asObservable();

  private currentCategorySource = new BehaviorSubject('');
  currentCategory = this.currentCategorySource.asObservable();

  constructor(private wpApiTerms: WpApiTerms) {
  }

  public getCategoriesResponse() {
    return this.wpApiTerms.getList('categories');
  }

  public storeCategoriesToService(categories) {
    this.categoriesSource.next(categories);
  }

  public storeCurrentCategoryToService(category) {
    this.currentCategorySource.next(category);
  }

  public getCategoryBySlug(slug) {
    return this.wpApiTerms.getList('categories', { 'search': { 'slug': slug } });
  }
}
