import {Component, OnInit} from '@angular/core';
import {Router}            from '@angular/router-deprecated';

@Component({
  selector: 'quizz-country',
  templateUrl: 'app/country/country.component.html',
  styleUrls: ['app/country/country.component.css']
})
export class CountryComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit() {
  }
}
