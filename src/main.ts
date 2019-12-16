import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { logger } from './app/utilities/logger.service';


declare var window: any;
declare var localStorage: any;

if (environment.production) {
  enableProdMode();
  if (window) {
    if (localStorage.getItem('dev') === 'true') {
      console.log('Dev mode is enable');
    } else {
      // disable console.log on production
      // window.console.log = function () { };
      const emptyFunc = function () { };
      window.console.log = emptyFunc;
      window.console.warn = emptyFunc;
      window.console.info = emptyFunc;
      window.console.error = emptyFunc;
      logger.log = emptyFunc;
      logger.debug = emptyFunc;
      logger.warn = emptyFunc;
      logger.info = emptyFunc;
      logger.error = emptyFunc;
    }
  }
}

platformBrowserDynamic().bootstrapModule(AppModule, {
  useJit: true,
  preserveWhitespaces: true
})
  .catch(err => console.log(err));
