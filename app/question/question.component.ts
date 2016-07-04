import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'quizz-question',
  templateUrl: 'app/question/question.component.html',
  styleUrls: ['app/question/question.component.css']
})
export class QuestionComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit() {
  }
}
