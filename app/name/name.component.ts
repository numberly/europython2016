import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {REACTIVE_FORM_DIRECTIVES, FormControl, Validators} from "@angular/forms";

import {UserService} from './../user/user.service';

@Component({
    selector: 'quizz-name',
    templateUrl: 'app/name/name.component.html',
    styleUrls: ['app/name/name.component.css', 'app/shared/next.css'],
    directives: [REACTIVE_FORM_DIRECTIVES]
})
export class NameComponent {
    name: FormControl = new FormControl("", [Validators.required]);

    constructor(private router: Router, private userService: UserService) {
    }

    fireNameTag() {
      (<any>window)._troq = (<any>window)._troq || [];

      try {
        var rtgpg = document.location.pathname.substr(1).split('/').join('-');
        var rtgname = (<HTMLInputElement>document.getElementById('name-input')).value || 'idontknowwhatsyournamedudecomeonehelpmefindout';
      } catch (e) {
        console.log(e);
        var rtgpg = 'idontknowwhereyouaredudecomeonehelpmefindout';
        var rtgname = 'idontknowwhatsyournamedudecomeonehelpmefindout';
      }

      (<any>window)._troq.push(
        ['tagid', '6562426-aeb6f8d8e7ba926984e4346e2bd36083'],
        ['_rtgname', rtgname]
      );

      (function () {
        if ((<any>window)._troqck !== 1) {
          var a = document.createElement('script');
          a.type = 'text/javascript';
          a.async = !0;
          a.src = '//mmtro.com/tro.js';
          var b = document.getElementsByTagName('script')[0];
          b.parentNode.insertBefore(a, b);
        }
      })();
    }

    submit() {
        this.router.navigate(['/email']);
    }
}
