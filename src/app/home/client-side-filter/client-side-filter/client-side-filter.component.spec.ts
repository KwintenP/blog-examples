/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ClientSideFilterComponent } from './client-side-filter.component';
import {GenderFilterComponent} from "../gender-filter/gender-filter.component";
import {CharacterListComponent} from "../character-list/character-list.component";
import {StarWarsService} from "../../../common-logic/services/star-wars.service";
import {CommonModule} from "@angular/common";


import { hot, cold, expectObservable, expectSubscriptions } from '../../../common//helpers/marble-testing';

import "../../../common/helpers/test-helper.ts";
import createSpyObj = jasmine.createSpyObj;
import Spy = jasmine.Spy;
fdescribe('ClientSideFilterComponent', () => {
  let component: ClientSideFilterComponent;
  let fixture: ComponentFixture<ClientSideFilterComponent>;
  let starWarsService: StarWarsService;

  // beforeEach(async(() => {
  //   TestBed.configureTestingModule({
  //     declarations: [ ClientSideFilterComponent, GenderFilterComponent, CharacterListComponent ],
  //     providers: [StarWarsService],
  //     imports: [CommonModule]
  //   })
  //   .compileComponents();
  // }));
  //
  // beforeEach(() => {
  //   fixture = TestBed.createComponent(ClientSideFilterComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });
  //
  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  beforeEach(() => {
    starWarsService = createSpyObj("starWarsService", ["getCharacters"]);

    component = new ClientSideFilterComponent(starWarsService);
  })

  it("should calculate the thing correctly", () => {
    const values = {a: "ALL", b: "MALE", c: "FEMALE", d: "All"};
    const filter$ = cold("a---b----c--d---|", values);

    const obiWan = {
      name: "Obi Wan",
      gender: "FEMALE"
    };
    const yoda = {
      name: "Yoda",
      gender: "Male"
    };
    const C3PO = {
      name: "c3po",
      gender: "N/A"
    };
    const characters$ = cold("-----a|", {a :[obiWan, yoda, C3PO]});

    const result$ = component.createFilterCharacters(filter$, characters$);

    expectObservable(result$).toBe("-----a---b--c---|", {a:[yoda], b:[obiWan], c:[obiWan, yoda, C3PO]});
  });
});
