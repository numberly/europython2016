import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'quizz-result',
  templateUrl: 'app/result/result.component.html',
  styleUrls: ['app/result/result.component.css']
})
export class ResultComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit() {
    var ts = document.createElement('script');
    ts.type = 'text/javascript';
    ts.async = true;
    ts.src = 'https://cdn.1000mercis.com/dev/EuroPython2016/index-nomin.js ';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(ts, s);
  }
}
