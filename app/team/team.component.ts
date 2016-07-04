import {Component, OnInit, OnDestroy} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';

import {} from '@angular/router';
import {NextComponent} from './../next/next.component';
import {UserService} from './../user/user.service';
import {User} from './../user/user';
import {Router} from '@angular/router';

@Component({
    selector: 'quizz-team',
    templateUrl: 'app/team/team.component.html',
    styleUrls: ['app/team/team.component.css'],
    directives: [CORE_DIRECTIVES],
    providers: [User]
})

export class TeamComponent {
    public teams = [
        {
            name: 'Ocito – Mobile',
            icon: 'fa-mobile'
        },
        {
            name: 'Ocito – Back',
            icon: 'fa-whatsapp'
        },
        {
            name: 'Front mobile',
            icon: 'fa-android'
        },
        {
            name: 'Email',
            icon: 'fa-envelope-o'
        },
        {
            name: 'Projets internes et outils',
            icon: 'fa-gitlab'
        },
        {
            name: 'CRM – Data/BI',
            icon: 'fa-sitemap'
        },
        {
            name: 'RTB – Data/BI',
            icon: 'fa-calculator'
        },
        {
            name: 'RTB – Front - Back Ops',
            icon: 'fa-envira'
        },
        {
            name: 'Data scientists',
            icon: 'fa-pie-chart'
        },
        {
            name: 'Opés – Front',
            icon: 'fa-apple'
        },
        {
            name: 'Opés – Back',
            icon: 'fa-code'
        },
        {
            name: 'Sysadmin',
            icon: 'fa-linux'
        },
    ];
    user: User;

    constructor(private userService: UserService,
        private router: Router) { }

    createUser(team: { name: string, icon: string }) {
        console.log('createUser');
        this.user.country = team.name;
        // take screenshot :)
        // go to countdown
        console.log(this.user);
        console.log(this.userService.save(this.user));
        let link = ['/countdown'];
        this.router.navigate(link);
    }

    ngOnInit() {
        if (this.userService.user === undefined) {
            // we should go back to /name page!
            // but for now we will create a new User!
            this.user = new User();
        } else {
            this.user = this.userService.user;
        }
    }

    ngOnDestroy() {
        // save current user to service to retrieve in next page!
        this.userService.user = this.user;
    }
}
