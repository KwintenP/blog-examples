import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/publishReplay';
import {ConnectableObservable} from 'rxjs';
import {StarWarsCharacter} from "../entities/star-wars.entity";
import {retry} from "../util/util";
@Injectable()
export class StarWarsService {

  constructor(private http: Http) {

  }

  @retry
  public getCharacters(): Observable<StarWarsCharacter[]> {
    return this.http.get('https://swapi.co/api/people/')
      .map((response: Response) => response.json().results);
  }
}
