import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/publishReplay';
import {StarWarsCharacter} from '../entities/star-wars.entity';
import {retry} from '../util/util';

@Injectable()
export class StarWarsService {
  retries = 5;
  delay = 10;

  constructor(private http: Http) {

  }

  @retry(3, [{name: 'Obi Wan', birth_year: '1234', gender: 'Male'}])
  public getCharacters(): Observable<StarWarsCharacter[]> {
    return Observable.of();
    // return this.http.get('https://swapi.co/api/people/')
    //   .map((response: Response) => response.json().results);
  }

  @retry(3, [{name: 'Obi Wan', birth_year: '1234', gender: 'Male'}])
  public getCharactersAndFail(): Observable<StarWarsCharacter[]> {
    return Observable.throw('Failing on purpose');
  }

  getDataWithConditionalRetry(url) {
    return this.http
      .get(url)
      .retryWhen(error$ => {
        return error$
          .flatMap((error: any) => {
            if (error.status === 503) {
              return Observable.of(error.status).delay(this.delay);
            }
            return Observable.throw({error: 'No retry'});
          })
          .take(this.retries)
          .concat(Observable.throw({error: `Sorry, there was an error after ${this.retries} retries`}));
      });
  }
}
