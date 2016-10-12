import 'reflect-metadata';
import 'zone.js/dist/zone';

import { DashboardComponent } from 'components/dashboard/dashboard.js';

describe('DashboardComponent', () => {
  let dashboardComponent = null

  beforeEach(() => {
    dashboardComponent = new DashboardComponent();
  });

  it('has message property after initialization', () => {
    expect(dashboardComponent.message).toBeDefined();
  });

  it('message property after initialization is set to "hello world"', () => {
    expect(dashboardComponent.message).toEqual('hello world');
  });
});
