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
      .take(10)
      .filter((val: number) => val % 2 > 0)
      .map((val: number) => val * 2);

    const other$ = Observable.interval(2000)
      .debug('second interval')
      .skip(3)
      .take(5)
      .map((val: number) => val * 3);

    interval$.combineLatest(other$, (interval, other) => interval * other)
      .debug('combined')
      .map(val => val)
      .subscribe(() => {});
  }
}
