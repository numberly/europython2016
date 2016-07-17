import {Component} from '@angular/core';
import {Router} from '@angular/router';
import { Scores } from './stats.scores';
import { User } from '../user/user';
import { UserService } from '../user/user.service';
import { UsersInterface } from '../user/users.interface';
import { OrderByPipe} from './stats.pipe';

@Component({
    selector: 'quizz-stats',
    templateUrl: 'app/stats/stats.component.html',
    styleUrls: ['app/stats/stats.component.css'],
    pipes: [OrderByPipe]
})

export class StatsComponent {
    constructor(private router: Router,
        private userService: UserService) { }


    public socket: WebSocket;
    public isopen: boolean;
    scores: Scores[];
    users: { [id: string]: User };

    ngOnInit() {
        this.isopen = false;
        this.socket = new WebSocket("ws://quizz.mmtro.com:9000");
        this.socket.binaryType = "arraybuffer";
        this.users = {};

        this.socket.onopen = (e: any) => {
            console.log("Connected!");
            this.isopen = true;
            this.get_scores();

        };

        this.socket.onmessage = (e: any) => {

            if (typeof e.data == "string") {
                let result = JSON.parse(e.data);
                if (result.scores) {
                    console.log('retrieves stats All scores');
                    console.log(result.scores);
                    this.userService.getUsers()
                        .subscribe(users => this.handleUsers(users, result.scores));
                } else if (result.hasOwnProperty('new_val')) {
                    console.log('retrieves stats rt for all scores');
                    console.log(result.new_val);
                    if (result.new_val === null) {
                        this.scores = [];

                    } else {

                        let x = false;
                        for (var el of this.scores) {
                            if (el.id_user === result.new_val.id_user) {
                                el.total_score = result.new_val.total_score;
                                x = true;
                            }
                        }
                        this.scores = this.scores.sort(function(a, b) {
                            if (a.total_score === b.total_score) {
                                return 0;
                            }
                            if (a.total_score < b.total_score) {
                                return 1;
                            } else {
                                return -1;
                            }
                        });
                        if (!x) {
                            // if we don't have the user we retrieve all the users (for now)
                            // but before we update the scores :)
                            this.userService.getUsers()
                                .subscribe(users => this.handleNewUser(users, result.new_val));
                        }
                    }
                    // console.log("Text message received: " + e.data);
                } else {
                    var arr = new Uint8Array(e.data);
                    var hex = '';
                    for (var i = 0; i < arr.length; i++) {
                        hex += ('00' + arr[i].toString(16)).substr(-2);
                    }
                    console.log("Binary message received: " + hex);
                }
            }
        }

        this.socket.onclose = function(e: Event) {
            console.log("Connection closed.");
            this.socket = null;
            this.isopen = false;
        }
    }

    handleNewUser(users: User[], score: Scores) {
        if (!!users) {
            console.log('handleNewUser');
            console.log(score);

            this.users = users.reduce(function(acc: { [id: string]: User }, el: User) {
                acc[el.id] = el;
                return acc;
            }, this.users);
            this.scores.push(score);
            this.scores = this.scores.sort(function(a, b) {
                if (a.total_score === b.total_score) {
                    return 0;
                }
                if (a.total_score < b.total_score) {
                    return 1;
                } else {
                    return -1;
                }
            });
        }
    }
    handleUsers(users: User[], scores: Scores[]) {
        scores = scores.sort(function(a, b) {
            if (a.total_score === b.total_score) {
                return 0;
            }
            if (a.total_score < b.total_score) {
                return 1;
            } else {
                return -1;
            }
        });
        this.scores = scores; this.rt_scores();
        // sort scores;

        if (!!users) {
            this.users = users.reduce(function(acc: { [id: string]: User }, el: User) {
                acc[el.id] = el;
                return acc;
            }, this.users);

        }
    }

    get_scores() {
        if (this.isopen) {
            this.socket.send("get_scores");
        } else {
            console.log("Connection not opened.")
        }
    }

    get_score(id_user: string) {
        if (this.isopen) {
            this.socket.send("get_scores " + id_user);
            // console.log("Request score for user.");
        } else {
            console.log("Connection not opened.")
        }
    }

    rt_scores() {
        if (this.isopen) {
            this.socket.send("rt_scores");
            // console.log("Text message sent.");
        } else {
            console.log("Connection not opened.")
        }
    }

    rt_top_by_country() {
        if (this.isopen) {
            this.socket.send("rt_top_by_country");
            // console.log("Text message sent.");
        } else {
            console.log("Connection not opened.")
        }
    }

    rt_score(id_user: string) {
        if (this.isopen) {
            this.socket.send("rt_scores " + id_user);
            // console.log("Text message sent.");
        } else {
            console.log("Connection not opened.")
        }
    }

    sendBinary() {
        if (this.isopen) {
            var buf = new ArrayBuffer(32);
            var arr = new Uint8Array(buf);
            for (let i = 0; i < arr.length; ++i) arr[i] = i;
            this.socket.send(buf);
            console.log("Binary message sent.");
        } else {
            console.log("Connection not opened.")
        }
    }

}
