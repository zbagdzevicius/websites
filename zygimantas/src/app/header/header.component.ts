import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  route;
  isMenuOpened = false;
  isContactOpened = false;

  constructor() { }

  ngOnInit() {
  }

  menuOpenClose() {
    this.isMenuOpened = this.isMenuOpened !== true;
  }

}
