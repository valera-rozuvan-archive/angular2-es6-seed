import {Component} from '@angular/core';

class DashboardComponent {
  constructor() {
    this.message = 'hello world';
  }
}

DashboardComponent.annotations = [
  new Component({
    selector: 'app',
    templateUrl: 'components/dashboard/dashboard.html',
    styleUrls: ['css/dashboard.component.css']
  })
];

export {DashboardComponent};
