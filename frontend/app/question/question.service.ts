import { Injectable }    from '@angular/core';
import { Headers, Http} from '@angular/http';
import { baseUrl }  from '../constant';

import { Question, Response } from './question';
import { UserService } from './../user/user.service';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class QuestionService {
    // baseUrl +
    private questionsUrl = baseUrl + 'api/questions';  // URL to web api
    private questionUrl = baseUrl + 'api/question/';  // URL to web api

    constructor(private http: Http, private userService: UserService) {
    }

    getQuestions() {
        return this.http.get(this.questionsUrl)
            .map(response => response.json().data);
    }

    save(question_id: number, answer_index: number) {
        // post on /question/:id  with {answer_index, id_user}
        let response = new Response();
        response.answer_index = answer_index;
        response.id_user = this.userService.user.id;
        return this.post(question_id, response);
    }

    // Add new User
    post(question_id: number, response: Response) {
        let headers = new Headers({
            'Content-Type': 'application/json'
        });
        let url = this.questionUrl + question_id;
        let strResponse = JSON.stringify(response);
        return this.http
            .post(url, strResponse, { headers: headers })
            .map(res => res.json());
    }

}
