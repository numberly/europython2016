import {Component, OnInit} from '@angular/core';
import {Router}            from '@angular/router';
import {NextComponent}     from './../next/next.component';

@Component({
  selector: 'quizz-email',
  templateUrl: 'app/email/email.component.html',
  styleUrls: ['app/email/email.component.css'],
  directives: [NextComponent],
})
export class EmailComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit() {
  }
}
