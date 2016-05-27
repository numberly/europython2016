import {Component, OnInit} from '@angular/core';
import {Router}            from '@angular/router-deprecated';

@Component({
  selector: 'quizz-email',
  templateUrl: 'app/email/email.component.html',
  styleUrls: ['app/email/email.component.css']
})
export class EmailComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit() {
  }
}
