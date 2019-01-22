import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Location } from '@angular/common';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ToolsService {

  constructor(private router: Router, private _location: Location, private activatedRoute: ActivatedRoute) {
  }

  public getCurrentPageFromUrl() {
    return Number(this.activatedRoute.snapshot.firstChild.url[this.activatedRoute.snapshot.firstChild.url.length - 1].path);
  }

  public getPostSlugFromUrl() {
    return this.activatedRoute.snapshot.firstChild.url[this.activatedRoute.snapshot.firstChild.url.length - 1].path;
  }

  public getCategoryNameSlug() {
    return this.activatedRoute.snapshot.firstChild.url[0].path;
  }

  public backToPreviousPage() {
    this._location.back();
  }

  public backToPreviousPageBySessionInformation(slug, id) {
    this.router.navigate([slug + '/' + id]);
  }

  public navigateToPage(page) {
    this.router.navigate([page]);
  }

  public refreshComponent(url) {
    this.router.navigateByUrl('/1', { skipLocationChange: true }).then(() =>
      this.router.navigate([url + '/1']));
  }

  public goToPageWithRefresh(url) {
    this.router.navigateByUrl('/1/1', { skipLocationChange: true }).then(() =>
      this.router.navigate(['/' + url]));
  }
}
