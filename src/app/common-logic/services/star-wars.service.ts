import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/publishReplay';
import {StarWarsCharacter} from '../entities/star-wars.entity';
import {retry} from '../util/util';
@Injectable()
export class StarWarsService {

  constructor(private http: Http) {

  }

  public getCharacters(): Observable<StarWarsCharacter[]> {
    return this.http.get('https://swapi.co/api/people/')
      .map((response: Response) => response.json().results);
  }

  @retry(3, [{name: 'Obi Wan', birth_year: '1234', gender: 'Male'}])
  public getCharactersAndFail(): Observable<StarWarsCharacter[]> {
    return Observable.throw('Failing on purpose');
  }
}
