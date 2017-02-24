import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/take';

import { hot, cold, expectObservable, expectSubscriptions } from './helpers/marble-testing';

import "./helpers/test-helper.ts";

//A few basic examples to get started
describe('The filter operator', () => {
  it('should correctly filter non-even numbers', () => {
    console.log("called");
    const source = Observable.from<number>([1,2,3,4,5]);
    const example = source.filter(num => num % 2 === 0);
    const values = {a: 2, b: 4};
    const expected = '(ab|)';

    expectObservable(example).toBe(expected, values);
  });
});
//Example with expectSubscription
describe('The merge operator', () => {
  it('should merge two observables', () => {
    const values = {a: 1, b: 2, c: 3, d: 4};
    const a = cold(' a-----b-----c----|', values)
    const asub = ( '^-----------------!')
    const b = cold('---------d----------|', values)
    const bsub =   '^-------------------!'
    const expected='-a-----b-d---c------|'

    expectObservable(a.merge(b).take(5)).toBe(expected, values);
    expectSubscriptions(a.subscriptions).toBe(asub);
    expectSubscriptions(b.subscriptions).toBe(bsub);
  });
});