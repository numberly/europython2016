import {Component, OnInit} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';

import {NextComponent} from './../next/next.component';
import {UserService} from './../user/user.service';
import {Router} from '@angular/router';

import { teams }  from './team.constant';

@Component({
    selector: 'quizz-team',
    templateUrl: 'app/team/team.component.html',
    styleUrls: ['app/team/team.component.css'],
    directives: [CORE_DIRECTIVES]
})

export class TeamComponent implements OnInit {
    public teams = teams;

    constructor(private userService: UserService,
        private router: Router) { }

    ngOnInit() {
        if (this.userService.user.name === undefined) {
            this.router.navigate(['/name']);
        }
    }

    createUser(team: { name: string, icon: string }) {
        this.userService.user.team = team.name;
        // take screenshot :)
        // go to countdown
        console.log(this.userService.user);
        this.userService.save(this.userService.user)
            .then(function(user) {
                console.log('User: ', user);
                let link = ['/countdown'];
                this.router.navigate(link);
            })
            .catch(this.handleError);
    }

    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
