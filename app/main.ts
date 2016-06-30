import {bootstrap}           from '@angular/platform-browser-dynamic';
import {provideRouter}       from '@angular/router';

import {PlayComponent}       from './play/play.component';
import {NameComponent}       from './name/name.component';
import {EmailComponent}      from './email/email.component';
import {TeamComponent}       from './team/team.component';
import {CountryComponent}    from './country/country.component';
import {CountdownComponent}  from './countdown/countdown.component';
import {QuestionComponent}   from './question/question.component';
import {AppComponent}        from './app.component';

var routes = [
    {path: '', component: PlayComponent},
    {path: 'play', component: PlayComponent},
    {path: 'name', component: NameComponent},
    {path: 'email', component: EmailComponent},
    {path: 'team', component: TeamComponent},
    {path: 'country', component: CountryComponent},
    {path: 'countdown', component: CountdownComponent},
    {path: 'question', component: QuestionComponent}
];

bootstrap(AppComponent, [provideRouter(routes)])
    .catch(err => console.error(err));
