import {Component, OnInit} from '@angular/core';
import {Router}            from '@angular/router-deprecated';

@Component({
  selector: 'quizz-countdown',
  templateUrl: 'app/countdown/countdown.component.html',
  styleUrls: ['app/countdown/countdown.component.css']
})
export class CountdownComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit() {
  }
}
