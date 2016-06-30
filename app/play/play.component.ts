import {Component, OnInit} from '@angular/core';
import {Router}            from '@angular/router';

@Component({
  selector: 'quizz-play',
  templateUrl: 'app/play/play.component.html',
  styleUrls: ['app/play/play.component.css']
})
export class PlayComponent implements OnInit {

  constructor(
    private router: Router) {
  }

  ngOnInit() {
  }

  goToName() {
    let link = ['Name'];
    this.router.navigate(link);
  }
}
