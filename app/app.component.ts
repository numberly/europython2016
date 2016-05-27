import {Component} from '@angular/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router-deprecated';

import {PlayComponent}       from './play';
import {NameComponent}       from './name';
import {CountryComponent}    from './country';
import {CountdownComponent}  from './countdown';
import {QuestionComponent}   from './question';

@Component({
  selector: 'quizz-app',
  template: '<router-outlet></router-outlet>',
  directives: [ROUTER_DIRECTIVES],
  providers: [ROUTER_PROVIDERS]
})
@RouteConfig([
  {
    path: '/play',
    name: 'Play',
    component: PlayComponent, useAsDefault: true
  },
  {
    path: '/name',
    name: 'Name',
    component: NameComponent
  },
  {
    path: '/country',
    name: 'Country',
    component: CountryComponent
  },
  {
    path: '/countdown',
    name: 'Countdown',
    component: CountdownComponent
  },
  {
    path: '/question',
    name: 'Question',
    component: QuestionComponent
  }
])
export class AppComponent {
}
