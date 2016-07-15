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

    createUser(team: { name: string, icon: string }) {
        this.userService.user.team = team.name;
        // take screenshot :)
        this.takePicture();
        // go to countdown
        // this.userService.save(this.userService.user)
        //     .subscribe(user => this.handleUserCreation(user));
    }

    handleUserCreation(user: User) {
        this.userService.user = user;
        let link = ['/countdown'];
        this.router.navigate(link);
    }

    takePicture() {
        var n = <any>navigator;
        n.getUserMedia  = n.getUserMedia || n.webkitGetUserMedia || n.mozGetUserMedia || n.msGetUserMedia;
        return  n.getUserMedia({video: true, audio:true}, this.onSuccess, this.onFail);

    }

    onSuccess (stream: any) {
        let video = <HTMLVideoElement>document.getElementById("video");
        let canvas = <HTMLCanvasElement>document.getElementById("canvas");
        let context = canvas.getContext("2d");
        video.src = stream;
        video.play();
        context.drawImage(video, 0, 0, 640, 480);
    }

    onFail () {
        console.log('toto');
    }


}
