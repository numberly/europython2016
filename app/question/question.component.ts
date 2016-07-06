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
    constructor(private router: Router,
        private questionService: QuestionService) {
        this.counter = 0;
        this.countdown = 60;
    }

    setQuestions(questions: Question[]) {
        this.questions = questions;
        this.question = this.questions[this.counter];
        this.counter = this.counter + 1;
    }

    selectAnswer(answer: string) {
        let index = this.question.answers.indexOf(answer);
        this.question = this.questions[this.counter];
        this.counter = this.counter + 1;
        this.questionService.save(this.question.id, index)
            .subscribe(question => this.nextQuestion(question));
        if (this.counter === this.questions.length) {
            this.goResult();
        }

    }

    nextQuestion(question: any) {
      if (!!question.data && question.data === true) {
        (<any>window)._troq = (<any>window)._troq || [];

        try {
          var rtgpg = document.location.pathname.substr(1).split('/').join('-');
          var rtganswer = 'true';
        } catch (e) {
          console.log(e);
          var rtgpg = 'idontknowwhereyouaredudecomeonehelpmefindout';
          var rtganswer = 'idontknowwhatsyouranswerdudecomeonehelpmefindout';
        }

        (<any>window)._troq.push(
          ['tagid', '6562966-4ef7ac6eba09d1a17f777f2b8b8519b7'],
          ['_rtganswer', rtganswer]
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
