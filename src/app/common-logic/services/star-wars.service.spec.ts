/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { StarWarsService } from './star-wars.service';

describe('StarWarsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StarWarsService]
    });
  });

  it('should ...', inject([StarWarsService], (service: StarWarsService) => {
    expect(service).toBeTruthy();
  }));
});
