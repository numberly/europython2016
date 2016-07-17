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
    interval: NodeJS.Timer;
    countdown: number;
    counter: number;
    questionClicked: boolean;

    constructor(private router: Router,
        private questionService: QuestionService) {
        this.counter = 0;
        this.countdown = 60;
        this.questionClicked = false;
    }

    setQuestions(questions: Question[]) {
        this.questions = questions;
        this.question = this.questions[this.counter];
        this.counter = this.counter + 1;
    }

    selectAnswer(answer: string) {
        let index = this.question.answers.indexOf(answer);
        let questionId = this.question.id;

        if (this.questionClicked === false) {
            this.questionClicked = true;
            this.questionService.save(questionId, index)
                .subscribe(question => this.nextQuestion(question));
        }
    }

    nextQuestion(question: any) {
        this.question = this.questions[this.counter];
        this.counter = this.counter + 1;
        this.questionClicked = false;
        if (this.counter === this.questions.length) {
            this.goResult();
        }
    }

    ngOnInit() {
        this.questionService.getQuestions()
            .subscribe(res => this.setQuestions(res));
        this.interval = setInterval(() => {
            this.decCountDown();
        }, 1000);
    }
    decCountDown() {
        this.countdown--;
        if (this.countdown == 0) {
            clearInterval(this.interval);
            this.goResult();
        }
    }

    goResult() {
        setTimeout(() => {
            let link = ['/result'];
            this.router.navigate(link);
        }, 500);
    }
}
