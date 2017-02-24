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
    (<Spy>starWarsService.getCharacters).and.returnValue(cold("--a-|", {a: [{name:"test", birth_year:"102020", gender: "M"}]}));

    component.ngOnInit();

    expectObservable(component.characters$).toBe(("--a-|", {a: [{name:"test", birth_year:"102020", gender: "M"}]}));
  });
});
