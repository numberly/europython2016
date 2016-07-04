import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {QuestionService} from './question.service';
import { Question } from './question';

@Component({
    selector: 'quizz-question',
    templateUrl: 'app/question/question.component.html',
    styleUrls: ['app/question/question.component.css'],
    providers: [QuestionService, Question]
})
export class QuestionComponent implements OnInit {

    questions: Question[];
    question: Question;
    counter: number;
    constructor(private router: Router,
        private questionService: QuestionService) {
        this.counter = 0;
    }

    setQuestions(questions: Question[]) {
        this.questions = questions;
        this.nextQuestion();
    }

    selectAnswer(answer: string) {
        let index = this.question.answers.indexOf(answer);
        this.questionService.save(this.question.id, index);
    }

    nextQuestion() {
        this.question = this.questions[this.counter];
        this.counter = this.counter + 1;
    }

    ngOnInit() {
        this.questionService.getQuestions()
            .subscribe(res => this.setQuestions(res));
    }
}
