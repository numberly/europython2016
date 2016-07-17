import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {REACTIVE_FORM_DIRECTIVES, FormControl, Validators} from "@angular/forms";

import {UserService} from './../user/user.service';

@Component({
    selector: 'quizz-country',
    templateUrl: 'app/country/country.component.html',
    styleUrls: ['app/country/country.component.css'],
    directives: [REACTIVE_FORM_DIRECTIVES]
})
export class CountryComponent {
    country: FormControl = new FormControl("", [Validators.required]);

    constructor(private router: Router, private userService: UserService) {
    }

    submit() {
        this.router.navigate(['/email']);
    }
}
