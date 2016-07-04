import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {NextComponent} from './../next/next.component';
import {UserService} from './../user/user.service';

@Component({
  selector: 'quizz-name',
  templateUrl: 'app/name/name.component.html',
  styleUrls: ['app/name/name.component.css'],
  directives: [NextComponent]
})
export class NameComponent {

  constructor(private router: Router, private userService: UserService) {
  }
}
