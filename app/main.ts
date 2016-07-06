import {bootstrap} from '@angular/platform-browser-dynamic';
import {provideRouter} from '@angular/router';
import {HTTP_PROVIDERS} from '@angular/http';
import {disableDeprecatedForms, provideForms} from '@angular/forms';

import {PlayComponent} from './play/play.component';
import {NameComponent} from './name/name.component';
import {EmailComponent} from './email/email.component';
import {TeamComponent} from './team/team.component';
import {CountryComponent} from './country/country.component';
import {CountdownComponent} from './countdown/countdown.component';
import {QuestionComponent} from './question/question.component';
import {ResultComponent} from './result/result.component';
import {AppComponent} from './app.component';
import {StatsComponent} from './stats/stats.component';
import {UserService} from './user/user.service';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';


var routes = [
    { path: '', component: PlayComponent },
    { path: 'play', component: PlayComponent },
    { path: 'name', component: NameComponent },
    { path: 'email', component: EmailComponent },
    { path: 'team', component: TeamComponent },
    { path: 'country', component: CountryComponent },
    { path: 'countdown', component: CountdownComponent },
    { path: 'question', component: QuestionComponent },
    { path: 'result', component: ResultComponent },
    { path: 'stats', component: StatsComponent}
];

bootstrap(AppComponent, [provideRouter(routes), HTTP_PROVIDERS, UserService,
                         disableDeprecatedForms(), provideForms()])
    .catch(err => console.error(err));
