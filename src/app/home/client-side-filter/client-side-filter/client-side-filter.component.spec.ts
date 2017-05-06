import "rxjs/add/observable/from";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/merge";
import "rxjs/add/operator/take";
import "../../../common/helpers/test-helper";
import {cold, expectObservable, hot} from "../../../common/helpers/marble-testing";
import {StarWarsService} from "../../../common-logic/services/star-wars.service";
import {ClientSideFilterComponent} from "./client-side-filter.component";
import {Observable} from "rxjs/Observable";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import createSpyObj = jasmine.createSpyObj;
import Spy = jasmine.Spy;

// Example with expectSubscription
describe('component: ClientSideFilterComponent', () => {
  let starWarsServiceMock: StarWarsService;
  let component: ClientSideFilterComponent;
  let obiWan;
  let c3po;
  let leia;

  beforeEach(() => {
    obiWan = {name: "ObiWan", gender: "Male"};
    c3po = {name: "C3PO", gender: "N/A"};
    leia = {name: "Leia", gender: "Female"};

    starWarsServiceMock = createSpyObj("starWarsService", ["getCharacters"]);

    component = new ClientSideFilterComponent(starWarsServiceMock);
  });

  it('on createFilterCharacters without marble testing', () => {
    // create a characters$ stream
    const characters$ = Observable.of([obiWan, c3po, leia]);
    // create a gender$ stream which is used to filter
    const gender$ = new BehaviorSubject<string>('All');


    let times = 0;
    // Feed the two streams to the method and subscribe to the result
    component.createFilterCharacters(gender$, characters$).subscribe(
      (val) => {
        // Based on the number of values that have passed here
        // check the value to see if it is what we expect
        if (times === 0) {
          expect(val).toEqual([obiWan, c3po, leia]);
          times++;
        } else if (times === 1) {
          expect(val).toEqual([obiWan]);
          times++;
        } else if (times === 2) {
          expect(val).toEqual([c3po]);
          times++;
        } else if (times === 3) {
          expect(val).toEqual([leia]);
          times++;
        }
      }
    );

    // pass new values to the gender subject to emulate the
    // gender filter change
    gender$.next("Male");
    gender$.next("N/A");
    gender$.next("Female");
  });

  it('on createFilterCharacters with marble testing', () => {
    // Using ascii marbles, we define a character stream.
    // It will first take some time (since this is will
    // be a backend call in real life, and then emit a value
    // and complete
    const charactersAscii = "----c|";
    const charactersValues = {c: [obiWan, c3po, leia]};

    const gender = "a------b---c--d";
    const genderValues = {a: "All", b: "Male", c: "N/A", d: "Female"};

    const result$ = component.createFilterCharacters(hot(gender, genderValues), cold(charactersAscii, charactersValues));

    expectObservable(result$).toBe("----a--b---c--d", {a: charactersValues.c, b: [obiWan], c: [c3po], d: [leia]});
  });
});
