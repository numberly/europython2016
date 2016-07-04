import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

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
    this.countdown = 3;
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
    this.go = true;
    setTimeout(() => {
    let link = ['/question'];
    this.router.navigate(link);
    }, 500);
  }

}
