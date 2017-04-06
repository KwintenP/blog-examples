import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoLocalCopiesComponent } from './no-local-copies.component';

describe('NoLocalCopiesComponent', () => {
  let component: NoLocalCopiesComponent;
  let fixture: ComponentFixture<NoLocalCopiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoLocalCopiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoLocalCopiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
