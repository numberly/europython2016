import {Component} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {}            from '@angular/router';
import {NextComponent}     from './../next/next.component';
@Component({
  selector: 'quizz-team',
  templateUrl: 'app/team/team.component.html',
  styleUrls: ['app/team/team.component.css'],
  directives: [CORE_DIRECTIVES]
})

export class TeamComponent {
  public teams = [
    {
      name: 'Ocito – Mobile',
      icon: 'fa-mobile'
    },
    {
      name: 'Ocito – Back',
      icon: 'fa-whatsapp'
    },
    {
      name: 'Front mobile',
      icon: 'fa-android'
    },
    {
      name: 'Email',
      icon: 'fa-envelope-o'
    },
    {
      name: 'Projets internes et outils',
      icon: 'fa-gitlab'
    },
    {
      name: 'CRM – Data/BI',
      icon: 'fa-sitemap'
    },
    {
      name: 'RTB – Data/BI',
      icon: 'fa-calculator'
    },
    {
      name: 'RTB – Front - Back Ops',
      icon: 'fa-envira'
    },
    {
      name: 'Data scientists',
      icon: 'fa-pie-chart'
    },
    {
      name: 'Opés – Front',
      icon: 'fa-apple'
    },
    {
      name: 'Opés – Back',
      icon: 'fa-code'
    },
    {
      name: 'Sysadmin',
      icon: 'fa-linux'
    },
  ];

  constructor() {
  }

  createUser(team) {
    console.log(team);
    console.log('createUser');
  }
}
