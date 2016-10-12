import 'core-js/shim';
import 'reflect-metadata';
import 'zone.js/dist/zone';

import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {AppModule} from 'modules/app.module';

// import {enableProdMode} from '@angular/core';
// if (ENVIRONMENT == 'production') {
//  enableProdMode();
// }

platformBrowserDynamic().bootstrapModule(AppModule);
