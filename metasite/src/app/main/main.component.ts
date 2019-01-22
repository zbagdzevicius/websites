import { UserService } from '../services/user.service';
import { Component, OnInit } from '@angular/core';
import { faEyeSlash, faEye, faArrowDown, faTrashAlt, faPen, faPlusCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html'
})

export class MainComponent implements OnInit {

    contacts;
    filterArgs;
    isAscendingOrdering: boolean;
    iscontactSelected = false;
    selectedContact;
    isActive;
    selectedRow = 1;
    cities;
    icons = {
        'eyeSlash': faEyeSlash,
        'eye': faEye,
        'arrowDown': faArrowDown,
        'trash': faTrashAlt,
        'pen': faPen,
        'plus': faPlusCircle
    };

    constructor(private userService: UserService) { }

    ngOnInit() {
        this.userService.getContacts()
            .subscribe(contacts => {
                this.contacts = contacts;
                this.selectedContact = contacts[0];
                this.cities = this.getCities(contacts);
            });
    }

    getCities(contacts) {
        const nonUniqueCities = [];
        for (const contact of contacts) {
            nonUniqueCities.push(contact.city);
        }
        const uniqueContacts = nonUniqueCities.filter((v, i, a) => a.indexOf(v) === i);
        return uniqueContacts;
    }

    filterContacts(name, city) {
        if (city === 'City' || city === 'Any City') {
            city = '';
        }
        this.filterArgs = {
            'name': name,
            'city': city,
            'active': this.isActive
        };
    }

    changeIsActiveFilter(event) {
        if (event.target.checked) {
            this.isActive = true;
        } else {
            this.isActive = '';
        }
    }

    changeContactsOrdering() {
        if (this.isAscendingOrdering === true) {
            this.contacts.sort(this.predicateAscendingBy('name'));
            this.isAscendingOrdering = false;
        } else {
            this.contacts.sort(this.predicateDescendingBy('name'));
            this.isAscendingOrdering = true;
        }
    }

    predicateDescendingBy(key) {
        return function (a, b) {
            if (a[key] > b[key]) {
                return 1;
            } else if (a[key] < b[key]) {
                return -1;
            }
            return 0;
        };
    }

    predicateAscendingBy(key) {
        return function (a, b) {
            if (a[key] > b[key]) {
                return -1;
            } else if (a[key] < b[key]) {
                return 1;
            }
            return 0;
        };
    }

    showContact(contact) {
        this.selectedContact = contact;
        this.selectedRow = this.selectedContact.id;
    }

    addNewContact() {
        const id = this.contacts[this.contacts.length - 1].id + 1;
        this.contacts.push({
            'id': id,
            'name': 'Ryan',
            'surname': 'Cook',
            'city': 'Vilnius',
            'email': 'ryan@gmail.com',
            'phone': '+444 6727 7255',
            'active': true
        });
    }

}
