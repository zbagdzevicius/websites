import { Component, OnInit } from '@angular/core';
import { faSearch, faUser, faUsers, faComments, faWrench, faPowerOff, faCaretDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  activeDropdown = false;

  icons = {
    'search': faSearch,
    'user': faUser,
    'users': faUsers,
    'comments': faComments,
    'wrench': faWrench,
    'power': faPowerOff,
    'down' : faCaretDown
  };

  constructor() { }

  ngOnInit() {
  }

}
