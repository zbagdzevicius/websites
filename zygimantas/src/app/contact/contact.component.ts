import { ContactService } from './../_services/contact.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ContactModel } from './contact.model';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html'
})
export class ContactComponent implements OnInit {
  message = new ContactModel();
  firstName;

  constructor(private contactService: ContactService) { }

  ngOnInit() {
  }

  sendMessage(form: NgForm) {
    console.log(form.value);
    this.firstName = form.value.firstName;
    this.contactService.send(form.value).subscribe();
  }
}
