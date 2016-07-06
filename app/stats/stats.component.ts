import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'quizz-stats',
    templateUrl: 'app/stats/stats.component.html',
    styleUrls: ['app/stats/stats.component.css']
})
export class StatsComponent {
    constructor(private router: Router) { }


    public socket: WebSocket;
    public isopen: boolean;

    ngOnInit() {
        this.isopen = false;
        this.socket = new WebSocket("ws://quizz:9000");
        this.socket.binaryType = "arraybuffer";

        this.socket.onopen = (e: any) => {
            console.log("Connected!");
            this.isopen = true;
        };

        this.socket.onmessage = (e: any) => {
            console.log(e);
            if (typeof e.data == "string") {
                let result = JSON.parse(e.data);
                console.log(result);
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

        this.socket.onclose = function(e: Event) {
            console.log("Connection closed.");
            this.socket = null;
            this.isopen = false;
        }
    }
    get_scores() {
        if (this.isopen) {
            this.socket.send("get_scores");
            // this.socket.send("get_scores", true);

            // console.log("Text message sent.");
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
