import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'uuid';
import 'add/operator/debug';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/audit';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/concat';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/shareReplay';

import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/zip';
import 'rxjs/add/observable/concat';
import {StarWarsService} from './common-logic/services/star-wars.service';
declare const fetch;
declare const web3;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app works!';

  constructor(private swService: StarWarsService) {

  }

  ngOnInit() {
    // const interval$ = Observable.interval(500)
    //   .debug('interval')
    //   .startWith(10)
    //   .take(10)
    //   .filter((val: number) => val % 2 > 0)
    //   .map((val: number) => val * 2)
    //   .mergeMap(val => this.swService.getCharactersAndFail())
    //   .publishReplay()
    // //   .subscribe(console.log);
    //
    // const shared$ = Observable.interval(1000)
    //   .take(5)
    //   .shareReplay();
    // // .multicast(new ReplaySubject(1));
    //
    //
    // shared$.subscribe(console.log);
    //
    // setTimeout(
    //   () => {
    //     shared$.subscribe(console.log);
    //   }, 7000);

    // const other$ = Observable.interval(1500)
    //   .debug('second interval')
    //   .skip(3)
    //   .take(5)
    //   .map((val: number) => val * 3);
    //
    // Observable.merge(interval$, other$)
    //   .debug('combined')
    //   .subscribe(() => {
    //   });
    //
    // const subject$ = new BehaviorSubject<number>(0);
    //
    // subject$.debug("test")
    //   .map((val: number) => val * 2)
    //   .subscribe(console.log);
    //
    // subject$.next(5);
    //
    // setTimeout(() => {
    //   subject$.next(8)
    // }, 10000);

    // const interval$ = Observable.interval(1).take(5);
    //
    // interval$.subscribe(console.log);
    //
    // setTimeout(() => interval$.subscribe(console.log), 600);

    Observable.of(10)
      .delay(1000)
      .subscribe(console.log);

    //
    // const getCharacter = () => {
    //   return fetch('https://swapi.co/api/people/1', {method: 'get'})
    //     .then(response => response.json());
    // }
    //
    // const getLuke$: Observable<{name, gender}> = Observable.of('')
    //   .debug('test')
    //   .mergeMap(() => getCharacter())
    //   .share();
    //
    // const name$ = getLuke$
    //   .map(char => char.name);
    //
    // const age$ = getLuke$
    //   .map(char => char.gender);
    //
    // name$.subscribe(console.log);
    // age$.subscribe(console.log);

  }
}
