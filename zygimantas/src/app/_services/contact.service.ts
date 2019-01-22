import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ContactModel } from './../contact/contact.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }

  send(contactForm: ContactModel) {
    const formdata: FormData = new FormData();
    formdata.append('firstName', contactForm.firstName);
    formdata.append('lastName', contactForm.lastName);
    formdata.append('telephone', contactForm.telephone);
    formdata.append('email', contactForm.email);
    formdata.append('subject', contactForm.subject);
    formdata.append('message', contactForm.message);
    return this.http.post('https://flask-mocroblog.herokuapp.com/', formdata);
  }
}


