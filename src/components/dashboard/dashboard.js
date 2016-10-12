import {Component} from '@angular/core';

@Component({
  selector: 'app',
  templateUrl: 'components/dashboard/dashboard.html'
})
export class DashboardComponent {
  constructor() {
    this.message = 'hello world';
  }
}
