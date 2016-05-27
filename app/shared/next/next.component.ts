import {Component, OnInit} from '@angular/core';
import {Router}            from '@angular/router-deprecated';

@Component({
  selector: 'quizz-next',
  templateUrl: 'app/next/next.component.html',
  styleUrls: ['app/next/next.component.css']
})
export class NextComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  gotoNext() {
    /* Retrieve the current route name
    ***
    */
    let link = ['Flag'];
    this.router.navigate(link);
  }
}
