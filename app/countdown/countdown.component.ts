import {Component, OnInit} from '@angular/core';
import {Router}            from '@angular/router-deprecated';

@Component({
  selector: 'quizz-countdown',
  templateUrl: 'app/countdown/countdown.component.html',
  styleUrls: ['app/countdown/countdown.component.css']
})
export class CountdownComponent implements OnInit {
  countdown: number;
  interval: NodeJS.Timer;
  go: boolean;

  constructor(private router: Router) {
    var that = this;
  }

  ngOnInit() {
    this.interval = setInterval(() => { this.decCountDown(); }, 1000);
  }

  decCountDown() {
    this.countdown--;
    if (this.countdown == 0) {
      clearInterval(this.interval);
      this.showPicture();
    }
  }

  showPicture() {
    var that = this;
    this.go = true;
    setTimeout(function() {
      that.goToQuestion();
    }, 500);
  }

  goToQuestion() {
    let link = ['Question'];
    this.router.navigate(link);
  }
}
