import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';
import {REACTIVE_FORM_DIRECTIVES, FormControl, Validators} from '@angular/forms';

import {UserService} from './../user/user.service';

@Component({
    selector: 'quizz-email',
    templateUrl: 'app/email/email.component.html',
    styleUrls: ['app/email/email.component.css', 'app/shared/next.css'],
    directives: [REACTIVE_FORM_DIRECTIVES]
})
export class EmailComponent implements OnInit {
    email: FormControl = new FormControl("", Validators.required);

    constructor(private router: Router, private userService: UserService) {
    }

    ngOnInit() {
        if (this.userService.user.name === undefined) {
            this.router.navigate(['/name']);
        }
    }

    submit() {
        this.router.navigate(['/team']);
    }
}
