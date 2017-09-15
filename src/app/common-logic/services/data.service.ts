import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Scheduler} from 'rxjs/Scheduler';
import {AsyncScheduler} from 'rxjs/scheduler/AsyncScheduler';
import {async} from 'rxjs/scheduler/async';

@Injectable()
export class DataService {
  retries = 3;
  delay = 10;
  scheduler = async;

  constructor(private http: HttpClient) {
  }

  getDataWithConditionalRetry(url) {
    return this.http
      .get(url)
      .retryWhen(error$ => {
        return error$
          .flatMap((error: any) => {
            if (error.status === 503) {
              console.log('error', error, 's');
              return Observable.of(error.status).delay(this.delay, this.scheduler);
            }
            return Observable.throw({error: 'No retry'});
          })
          .take(this.retries)
          .concat(Observable.throw({error: `Sorry, there was an error after ${this.retries} retries`}));
      });
  }
}
