import {Component, OnInit} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';

import {UserService} from './../user/user.service';
import { User } from './../user/user';
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

    fireTeamTag(team: { name: string, icon: string, id: string }) {
      (<any>window)._troq = (<any>window)._troq || [];

      try{
        var rtgpg = document.location.pathname.substr(1).split('/').join('-');
        var rtgteam = team.id || 'idontknowwhatsyourteamdudecomeonehelpmefindout';
      } catch (e) {
        console.log(e);
        var rtgpg = 'idontknowwhereyouaredudecomeonehelpmefindout';
        var rtgteam = 'idontknowwhatsyourteamdudecomeonehelpmefindout';
      }

      (<any>window)._troq.push(
        ['tagid', '6562426-aeb6f8d8e7ba926984e4346e2bd36083'],
        ['_rtgteam', rtgteam]
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

    createUser(team: { name: string, icon: string }) {
        this.userService.user.team = team.name;
        // take screenshot :)
        // go to countdown
        this.userService.save(this.userService.user)
            .subscribe(user => this.handleUserCreation(user));
    }

    handleUserCreation(user: User) {
        console.log('User: ', user);
        this.userService.user = user;
        let link = ['/countdown'];
        this.router.navigate(link);
    }
}
