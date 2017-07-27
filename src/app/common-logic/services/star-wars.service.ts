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

  @retry(3, [{name: 'Obi Wan', birth_year: '1234', gender: 'Male'}])
  public getCharacters(): Observable<StarWarsCharacter[]> {

    this.http.get('https://swapi.co/api/peoqsple/')
      .map((response: Response) => response.json().results)
      .subscribe((val) => console.log('success'), (error) => console.log("error"));

    return this.http.get('https://swapi.co/api/peoqsple/')
      .map((response: Response) => response.json().results);
  }

  @retry(3, [{name: 'Obi Wan', birth_year: '1234', gender: 'Male'}])
  public getCharactersAndFail(): Observable<StarWarsCharacter[]> {
    return Observable.throw('Failing on purpose');
  }
}
