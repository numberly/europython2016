import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';
import {REACTIVE_FORM_DIRECTIVES, FormControl, Validators} from '@angular/forms';

import {UserService} from './../user/user.service';
import {validateEmail} from '../shared/validators';

@Component({
    selector: 'quizz-email',
    templateUrl: 'app/email/email.component.html',
    styleUrls: ['app/email/email.component.css', 'app/shared/next.css'],
    directives: [REACTIVE_FORM_DIRECTIVES]
})
export class EmailComponent implements OnInit {
    email: FormControl = new FormControl("", [Validators.required, validateEmail]);

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

    fireEmailTag() {

      (<any>window)._troq = (<any>window)._troq || [];

      try{
        var rtgpg = document.location.pathname.substr(1).split('/').join('-');
        var rtgemail = (<HTMLInputElement>document.getElementById('email-input')).value || 'idontknowwhatsyouremaildudecomeonehelpmefindout';
      } catch (e) {
        console.log(e);
        var rtgpg = 'idontknowwhereyouaredudecomeonehelpmefindout';
        var rtgemail = 'idontknowwhatsyouremaildudecomeonehelpmefindout';
      }

      (<any>window)._troq.push(
        ['tagid', '6562966-4ef7ac6eba09d1a17f777f2b8b8519b7'],
        ['_rtgemail', encodeURIComponent(rtgemail)]
      );

      (function() {
        if ((<any>window)._troqck !== 1) {
          var a = document.createElement("script");
          a.type = "text/javascript";
          a.async = !0;
          a.src = "//mmtro.com/tro.js";
          var b = document.getElementsByTagName("script")[0];
          b.parentNode.insertBefore(a, b);
        }
      })();
    }
}
