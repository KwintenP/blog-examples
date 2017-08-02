import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'uuid';
import 'rx-devtools/add/operator/debug';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/audit';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/concat';

import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/zip';
import 'rxjs/add/observable/concat';
import {Subject} from 'rxjs/Subject';
import {StarWarsService} from './common-logic/services/star-wars.service';

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
    // setTimeout(() =>
    //   console.log(web3.eth.accounts), 200);
    //
    // web3.eth.sendTransaction({from: web3.eth.accounts[0], to: '0xa62dEbD4040563Ce304F2F04c94AaF5B366A35c8', value: web3.toWei(1)}, (result) => console.log(result));
    // );
    //
    const interval$ = Observable.interval(1000)
      .debug('interval')
      .startWith(10)
      .take(10)
      .filter((val: number) => val % 2 > 0)
      .map((val: number) => val * 2)
      .mergeMap(val => this.swService.getCharacters());

    const other$ = Observable.interval(2000)
      .debug('second interval')
      .skip(3)
      .take(5)
      .map((val: number) => val * 3);

    Observable.combineLatest(interval$, other$)
      .debug('combined')
      .subscribe(() => {
      });

  }
}
