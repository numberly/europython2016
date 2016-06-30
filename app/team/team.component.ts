import {Component} from '@angular/core';
import {}            from '@angular/router';

@Component({
  selector: 'quizz-team',
  templateUrl: 'app/team/team.component.html',
  styleUrls: ['app/team/team.component.css']
})
export class TeamComponent {
  team: Array<string>;

  constructor() {
    this.team = {
      'Ocito – Mobile': 'fa-mobile',
      'Ocito – Back': 'fa-whatsapp',
      'Front mobile': 'fa-android',
      'Email': 'fa-envelope-o',
      'Projets internes et outils': 'fa-gitlab',
      'CRM – Data/BI': 'fa-sitemap',
      'RTB – Data/BI': 'fa-calculator',
      'RTB – Front - Back Ops': 'fa-envira',
      'Data scientists': 'fa-pie-chart',
      'Opés – Front': 'fa-apple',
      'Opés – Back': 'fa-code',
      'Sysadmin': 'fa-linux',
    };
  }
}
