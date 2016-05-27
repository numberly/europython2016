import {Component, OnInit} from '@angular/core';
import {Router}            from '@angular/router-deprecated';

@Component({
  selector: 'quizz-name',
  templateUrl: 'app/name/name.component.html',
  styleUrls: ['app/name/name.component.css']
})
export class NameComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit() {
  }
}
