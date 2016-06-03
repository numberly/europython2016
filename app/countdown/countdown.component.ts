import {Component, OnInit} from '@angular/core';
import {Router}            from '@angular/router-deprecated';

@Component({
  selector: 'quizz-countdown',
  templateUrl: 'app/countdown/countdown.component.html',
  styleUrls: ['app/countdown/countdown.component.css']
})
export class CountdownComponent implements OnInit {
  countdown = 5;
  private interval=null;
  go = false;

  constructor(private router: Router) {
  	var that=this;
  	this.interval=setInterval(function() {that.decCountDown();}, 1000);
  }

  ngOnInit() {
  }

  decCountDown() {
  	this.countdown--;
  	if(this.countdown==0) {
  		clearInterval(this.interval);
  		this.showPicture();
  	}  	
  }

  showPicture() {
  	var that=this;
  	this.go=true;
  	setTimeout(function() {
  		that.goToQuestion();
  	},3000);
  }

  goToQuestion() {
  	let link = ['Question'];
    this.router.navigate(link);
  }
}
