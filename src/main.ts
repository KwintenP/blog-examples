import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {setupRxDevtools} from 'rx-devtools';

import 'web3';

if (environment.production) {
  enableProdMode();
} else {
  const monkeyPatchSubscribe = function () {
    const originalSubscribe = Observable.prototype.subscribe;
    Observable.prototype.subscribe = function (...args) {
      console.log('subscribed!');
      const subscription = originalSubscribe.apply(this, args);
      (subscription as any).id = 'testes';
      console.log('subscription', subscription.unsubscribe);
      return subscription;
    };

    const originalUnsubscribe = Subscription.prototype.unsubscribe;
    Subscription.prototype.unsubscribe = function (...args) {
      console.log('unsubscribed', this);
      return originalUnsubscribe.apply(this, args);
    };
  }
  // monkeyPatchSubscribe();
   setupRxDevtools();

  let nrOfSubscriptions = 0;

  const monkeyPatch = (obj, val) => {
    const handler = {
      get(target, propKey, receiver) {
        const origMethod = target[propKey];
        return function (...args) {
          if(val === 'sub') {
            nrOfSubscriptions++;
          }
          if(val === 'unsub') {
            nrOfSubscriptions--;
          }
          console.log('nrOfSubscriptions', nrOfSubscriptions);
          const result = origMethod.apply(target, args);
          console.log('tada', propKey + args
            + ' -> ' + result);
          return result;
        };
      }
    };
    return new Proxy(obj, handler);
  }

  Observable.prototype.subscribe = monkeyPatch(Observable.prototype.subscribe, 'sub');
  Subscription.prototype.unsubscribe = monkeyPatch(Subscription.prototype.unsubscribe, 'unsub');
}

platformBrowserDynamic().bootstrapModule(AppModule);
