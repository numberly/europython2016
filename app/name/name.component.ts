import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NextComponent} from './../next/next.component';

@Component({
  selector: 'quizz-name',
  templateUrl: 'app/name/name.component.html',
  styleUrls: ['app/name/name.component.css'],
  directives: [NextComponent]
})
export class NameComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit() {
  }
}
