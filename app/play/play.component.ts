import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'quizz-play',
    templateUrl: 'app/play/play.component.html',
    styleUrls: ['app/play/play.component.css']
})
export class PlayComponent {
    constructor(private router: Router) { }

    fireStartTag() {
      (<any>window)._troq = (<any>window)._troq || [];

      try{
        var rtgpg = document.location.pathname.substr(1).split('/').join('-');
      } catch (e) {
        console.log(e);
        var rtgpg = 'idontknowwhereyouaredudecomeonehelpmefindout';
      }

      (<any>window)._troq.push(
        ['tagid', '6562966-4ef7ac6eba09d1a17f777f2b8b8519b7'],
        ['_rtgscore', 0]

      );

      (function() {
        if ((<any>window)._troqck !== 1) {
          var a = document.createElement("script");
          a.type = "text/javascript";
          a.async = !0;
          a.src = "//mmtro.com/tro.js";
          var b = document.getElementsByTagName("script")[0];
          b.parentNode.insertBefore(a, b);
        }
      })();
    }

    goToName() {
        let link = ['/name'];
        this.router.navigate(link);
    }
}
