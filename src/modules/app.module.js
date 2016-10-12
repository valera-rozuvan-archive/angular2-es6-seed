import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {DashboardComponent} from 'components/dashboard/dashboard';
import {InitCapsPipe} from 'utils/init-caps-pipe.js';

@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [DashboardComponent, InitCapsPipe],
  bootstrap: [DashboardComponent]
})

export class AppModule {}
