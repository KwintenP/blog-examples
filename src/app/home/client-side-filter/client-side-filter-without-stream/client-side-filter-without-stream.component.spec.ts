/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ClientSideFilterWithoutStreamComponent } from './client-side-filter-without-stream.component';

describe('ClientSideFilterWithoutStreamComponent', () => {
  let component: ClientSideFilterWithoutStreamComponent;
  let fixture: ComponentFixture<ClientSideFilterWithoutStreamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientSideFilterWithoutStreamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientSideFilterWithoutStreamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
