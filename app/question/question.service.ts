import { Injectable }    from '@angular/core';
import { Headers, Http} from '@angular/http';
import { baseUrl }  from '../constant';

import { Question } from './question';

@Injectable()
export class QuestionService {
    // baseUrl +
    private questionsUrl = 'api/questions';  // URL to web api

    constructor(private http: Http) {
    }

    getQuestions() {
        return this.http.get(this.questionsUrl)
            .map(response => response.json());
    }

    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
