import { Injectable } from '@angular/core';
import { range } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PagerService {

  constructor() {
  }

  getPager(currentPage, totalPages) {
    let startPage: number, displayedPages: number;
    if (totalPages <= 7) {
      startPage = 1;
      displayedPages = totalPages;
    } else {
      displayedPages = 7;
      if (currentPage - 3 <= 1 || totalPages <= 7) {
        startPage = 1;
      } else if (currentPage + 3 >= totalPages) {
        startPage = totalPages - 6;
      } else {
        startPage = currentPage - 3;
      }
    }

    const pagesArray = [];
    const pagesIterator = range(startPage, 7);
    pagesIterator
      .subscribe(page => {
        pagesArray.push(page);
      });

    return {
      currentPage: currentPage,
      totalPages: totalPages,
      startPage: startPage,
      pages: this.createArrayOfAllPages(startPage, displayedPages)
    };
  }

  public createArrayOfAllPages(startPage, displayedPages) {
    const pagesArray = [];
    const pagesIterator = range(startPage, displayedPages);
    pagesIterator
      .subscribe(page => {
        pagesArray.push(page);
      });
    return pagesArray;
  }
}
