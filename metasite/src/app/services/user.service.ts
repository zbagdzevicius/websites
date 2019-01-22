import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  contactsURL = 'assets/data/contacts.json';

  getContacts() {
    return this.http.get(this.contactsURL);
  }
}
