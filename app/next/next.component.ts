import { Component, Input, OnInit } from '@angular/core';
import {Router}            from '@angular/router';

@Component({
  selector: 'quizz-next',
  templateUrl: 'app/next/next.component.html',
  styleUrls: ['app/next/next.component.css']
})
export class NextComponent implements OnInit {

  constructor(private router: Router) { }

  @Input('next') next: string;

  goToNext() {
    let link = [this.next];
    this.router.navigate(link);
  }

  ngOnInit() {
  }
}
