import "rxjs/add/observable/from";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/merge";
import "rxjs/add/operator/take";
import "../../../common/helpers/test-helper";
import {cold, expectObservable, expectSubscriptions} from "../../../common/helpers/marble-testing";

// Example with expectSubscription
describe('component: ClientSideFilterComponent', () => {
  it('on createFilterCharacters', () => {
    const values = {a: 1, b: 2, c: 3, d: 4};
    const a = cold(' a-----b-----c----|', values)
    const asub = ( '^-----------------!')
    const b = cold('---------d----------|', values)
    const bsub = '^-------------------!'
    const expected = '-a-----b-d---c------|'

    expectObservable(a.merge(b).take(5)).toBe(expected, values);
    expectSubscriptions(a.subscriptions).toBe(asub);
    expectSubscriptions(b.subscriptions).toBe(bsub);
  });
});
