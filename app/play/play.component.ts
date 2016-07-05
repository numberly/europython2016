import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'quizz-play',
    templateUrl: 'app/play/play.component.html',
    styleUrls: ['app/play/play.component.css']
})
export class PlayComponent {
    constructor(private router: Router) { }

    goToName() {
        let link = ['/name'];
        this.router.navigate(link);
    }
}
