import "rxjs/add/observable/from";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/merge";
import "rxjs/add/operator/take";
import "../../../common/helpers/test-helper";
import {cold, expectObservable, expectSubscriptions, hot} from "../../../common/helpers/marble-testing";
import {StarWarsService} from "../../../common-logic/services/star-wars.service";
import {ClientSideFilterComponent} from "./client-side-filter.component";
import createSpyObj = jasmine.createSpyObj;
import Spy = jasmine.Spy;

// Example with expectSubscription
describe('component: ClientSideFilterComponent', () => {
  let starWarsServiceMock: StarWarsService;
  let component: ClientSideFilterComponent;

  beforeEach(() => {
    starWarsServiceMock = createSpyObj("starWarsService", ["getCharacters"]);

    component = new ClientSideFilterComponent(starWarsServiceMock);
  });

  it('on createFilterCharacters', () => {
    const characters = "----c|";
    const obiWan = {name: "ObiWan", gender: "Male"};
    const c3po = {name: "C3PO", gender: "N/A"};
    const leia = {name: "Leia", gender: "Female"};
    const charactersValues = {c: [obiWan, c3po, leia]};

    const gender = "a------b---c--d";
    const genderValues = {a: "All", b: "Male", c: "N/A", d: "Female"};

    const result$ = component.createFilterCharacters(hot(gender, genderValues), cold(characters, charactersValues));

    expectObservable(result$).toBe("----a--b---c--d", {a: charactersValues.c, b: [obiWan], c: [c3po], d: [leia]});
  });
});
