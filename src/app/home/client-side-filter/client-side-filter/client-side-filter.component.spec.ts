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
    const characters$ = Observable.of([obiWan, c3po, leia]);
    const gender$ = new BehaviorSubject<string>('All');

    let times = 0;
    component.createFilterCharacters(gender$, characters$).subscribe(
      (val) => {
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

    gender$.next("Male");
    gender$.next("N/A");
    gender$.next("Female");
  });

  it('on createFilterCharacters with marble testing', () => {
    const characters = "----c|";
    const charactersValues = {c: [obiWan, c3po, leia]};

    const gender = "a------b---c--d";
    const genderValues = {a: "All", b: "Male", c: "N/A", d: "Female"};

    const result$ = component.createFilterCharacters(hot(gender, genderValues), cold(characters, charactersValues));

    expectObservable(result$).toBe("----a--b---c--d", {a: charactersValues.c, b: [obiWan], c: [c3po], d: [leia]});
  });
});
