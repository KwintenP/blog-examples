import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable } from 'rxjs/Observable';
import {DataService} from './data.service';
import {marbles} from 'rxjs-marbles';

describe('DataService', () => {

  let service: DataService;
  let http: HttpClient;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        DataService
      ]
    });

    service = TestBed.get(DataService);
    service.delay = 1;
    service.retries = 5;
    http = TestBed.get(HttpClient);
  });
  //
  // it('should retry 5 times if status is 503',  (done) => {
  //
  //   spyOn(http, 'get').and.returnValue(Observable.throw({status: 503}));
  //
  //   service.getDataWithConditionalRetry('/api/data')
  //     .subscribe(res => {},
  //       (error) => {
  //         expect(error).toEqual({error: 'Sorry, there was an error after 5 retries'});
  //         done();
  //       });
  // });
  //
  // it('should not retry if status is not 503',  (done) => {
  //
  //   spyOn(http, 'get').and.returnValue(Observable.throw({status: 404}));
  //
  //   service.getDataWithConditionalRetry('/api/data')
  //     .subscribe(res => {},
  //       (error) => {
  //         expect(error).toEqual({error: 'No retry'});
  //         done();
  //       });
  // });

  it('should retry 5 times if the statis is 503 with marble testing', marbles((m, done) => {
    // @formatter:off
    const source$ =     m.cold('----#', {}, {status: 503});
    const subs =              ['^---!           ',
                               '      ^---!     ',
                               '           ^---!'];
    const expected =           '--------------------#';
    // @formatter:on

    spyOn(http, 'get').and.returnValue(source$);

    const result$ = service.getDataWithConditionalRetry('api/data');

    m.expect(result$).toBeObservable(expected, {}, {error: 'Sorry, there was an error after 5 retries'});
  }));

});
