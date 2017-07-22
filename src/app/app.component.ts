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

import 'rxjs/add/observable/combineLatest';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app works!';

  ngOnInit() {
    const interval$ = Observable.interval(1000)
      .debug('interval')
      .startWith(12)
      .take(10)
      .filter((val: number) => val % 2 > 0)
      .map((val: number) => val * 2);

    const other$ = Observable.interval(2000)
      .debug('second interval')
      .skip(3)
      .map((val: number) => val * 3);

    Observable.combineLatest<number, number>(interval$, other$)
      .debug('combined')
      .map(([interval, other]) => {
      return interval * other;
    })
      .subscribe(() => {});
  }
}
