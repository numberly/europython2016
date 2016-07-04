import { Injectable }    from '@angular/core';
import { Headers, Http} from '@angular/http';
import { baseUrl }  from '../constant';

import 'rxjs/add/operator/toPromise';

import { User } from './user';

@Injectable()
export class UserService {

    private usersUrl = baseUrl + '/users';  // URL to web api
    user: User;

    constructor(private http: Http) {
        this.user = new User();
    }

    getUsers(): Promise<User[]> {
        return this.http.get(this.usersUrl)
            .toPromise()
            .then(response => response.json().data)
            .catch(this.handleError);
    }

    save(user: User): Promise<User> {
        if (user._id) {
            return this.put(user);
        }
        return this.post(user);
    }

    delete(user: User) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let url = `${this.usersUrl}/${user._id}`;

        return this.http
            .delete(url, headers)
            .toPromise()
            .catch(this.handleError);
    }

    // Add new User
    private post(user: User): Promise<User> {
        let headers = new Headers({
            'Content-Type': 'application/json'
        });

        return this.http
            .post(this.usersUrl, JSON.stringify(user), { headers: headers })
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    // Update existing Hero
    private put(user: User) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let url = `${this.usersUrl}/${user._id}`;

        return this.http
            .put(url, JSON.stringify(user), { headers: headers })
            .toPromise()
            .then(() => user)
            .catch(this.handleError);
    }

    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
