import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';
import {NextComponent} from './../next/next.component';
import {UserService} from './../user/user.service';
import {User} from './../user/user';

@Component({
  selector: 'quizz-email',
  templateUrl: 'app/email/email.component.html',
  styleUrls: ['app/email/email.component.css'],
  directives: [NextComponent],
  providers: [User]
})
export class EmailComponent implements OnInit {

  user : User;

  constructor(private router: Router,
    private userService: UserService) {
  }

  ngOnInit() {
    if (this.userService.user === undefined) {
        // we should go back to /name page!
        // but for now we will create a new User!
        this.user = new User();
    } else {
        this.user = this.userService.user;
    }
  }

  ngOnDestroy() {
    // save current user to service to retrieve in next page!
    this.userService.user = this.user;
  }
}
