import { Injectable }    from '@angular/core';
import { Headers, Http} from '@angular/http';
import { baseUrl }  from '../constant';

import 'rxjs/add/operator/toPromise';

import { User } from './user';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {

    private usersUrl = baseUrl + '/users';  // URL to web api
    user: User;

    constructor(private http: Http) {
        this.user = new User();
    }

    getUsers(): Observable<any> {
        return this.http.get(this.usersUrl)
            .map(response => response.json().data);
    }

    save(user: User) {
        return this.post(user);
    }

    delete(user: User) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let url = `${this.usersUrl}/${user.id}`;

        return this.http
            .delete(url, headers);
    }

    // Add new User
    private post(user: User): Observable<any> {
        let headers = new Headers({
            'Content-Type': 'application/json'
        });

        return this.http
            .post(this.usersUrl, JSON.stringify(user), { headers: headers })
            .map(res => res.json().data);
    }
}
