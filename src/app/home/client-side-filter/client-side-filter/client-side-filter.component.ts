import {Component, OnInit, ViewChildren, AfterViewInit, ViewChild} from "@angular/core";
import {StarWarsService} from "../../../common-logic/services/star-wars.service";
import {StarWarsCharacter} from "../../../common-logic/entities/star-wars.entity";
import {Observable, BehaviorSubject, Subject} from "rxjs";
import "rxjs/add/operator/combineLatest";
import {GenderFilterComponent} from "../gender-filter/gender-filter.component";
import 'rx-devtools/add/operator/debug';
import {MapOperator} from 'rxjs/operator/map';

@Component({
  selector: 'app-client-side-filter',
  templateUrl: './client-side-filter.component.html',
  styleUrls: ['./client-side-filter.component.css']
})
export class ClientSideFilterComponent implements OnInit, AfterViewInit {
  filter$: Subject<string>;
  characters$: Observable<StarWarsCharacter[]>;
  filteredCharacters$: Observable<StarWarsCharacter[]>;

  @ViewChild(GenderFilterComponent) genderFilter;

  constructor(private starWarsService: StarWarsService) {
  }

  ngAfterViewInit() {
    this.genderFilter.filterChange.subscribe(console.log);
  }

  ngOnInit() {
    // A-----M----F----N----
    this.filter$ = new BehaviorSubject('All');

    // -----C------
    this.characters$ = this.starWarsService.getCharacters();

    // A-----M----F----N----
    // ------C---------------
    // combine latest
    // A----f-----f----f-----  (f filtered char list)
    this.filteredCharacters$ = this.createFilterCharacters(this.filter$, this.characters$);
  }

  public createFilterCharacters(filter$: Observable<string>, characters$: Observable<StarWarsCharacter[]>) {
    return characters$.combineLatest(
      filter$, (characters: StarWarsCharacter[], filter: string) => {
        if (filter === 'All') {
          return characters;
        }
        return characters.filter((character: StarWarsCharacter) => character.gender.toLowerCase() === filter.toLowerCase());
      });
  }

  filterChanged(value: string) {
    this.filter$.next(value);
  }
}
