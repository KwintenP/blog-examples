import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class DataService {
  retries = 5;
  delay = 10;

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
              return Observable.of(error.status);
            }
            return Observable.throw('');
          })
          .take(this.retries)
          .concat(Observable.throw({error: `Sorry, there was an error after ${this.retries} retries`}));
      });
  }
}
