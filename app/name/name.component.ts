import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';
import {NextComponent} from './../next/next.component';
import {User} from './../user/user';
import {UserService} from './../user/user.service';

@Component({
  selector: 'quizz-name',
  templateUrl: 'app/name/name.component.html',
  styleUrls: ['app/name/name.component.css'],
  directives: [NextComponent],
  providers: [User]
})
export class NameComponent implements OnInit {

  user : User;

  constructor(private router: Router,
    private userService: UserService) {
  }

  ngOnInit() {
    this.user = new User();
  }

  ngOnDestroy() {
    // save current user to service to retrieve in next page!
    this.userService.user = this.user;
  }
}
