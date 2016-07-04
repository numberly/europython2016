import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {REACTIVE_FORM_DIRECTIVES, FormControl, Validators} from "@angular/forms";

import {NextComponent} from './../next/next.component';
import {UserService} from './../user/user.service';

@Component({
    selector: 'quizz-name',
    templateUrl: 'app/name/name.component.html',
    styleUrls: ['app/name/name.component.css'],
    directives: [REACTIVE_FORM_DIRECTIVES, NextComponent]
})
export class NameComponent {
    name: FormControl = new FormControl("", Validators.required);

    constructor(private router: Router, private userService: UserService) {
    }
}
