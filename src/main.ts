import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { setupRxDevtools } from 'rx-devtools/rx-devtools';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';

if (environment.production) {
  enableProdMode();
} else {
  const monkeyPatchSubscribe = function() {
    const originalSubscribe = Observable.prototype.subscribe;
    Observable.prototype.subscribe = function (...args) {
      console.log('subscribed!');
      const subscription =  originalSubscribe.apply(this, args);
      (subscription as any).id = 'testes';
      console.log('subscription', subscription.unsubscribe);
      return subscription;
    };

    const originalUnsubscribe = Subscription.prototype.unsubscribe;
    Subscription.prototype.unsubscribe = function(...args) {
      console.log('unsubscribed', this);
      return originalUnsubscribe.apply(this, args);
    };
  }
  monkeyPatchSubscribe();
  setupRxDevtools();
}

platformBrowserDynamic().bootstrapModule(AppModule);
