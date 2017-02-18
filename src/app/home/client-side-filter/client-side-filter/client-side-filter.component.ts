import {Component, OnInit} from "@angular/core";
import {StarWarsService} from "../../../common-logic/services/star-wars.service";
import {StarWarsCharacter} from "../../../common-logic/entities/star-wars.entity";
import {Observable, BehaviorSubject} from "rxjs";
import "rxjs/add/operator/combineLatest";

@Component({
  selector: 'app-client-side-filter',
  templateUrl: './client-side-filter.component.html',
  styleUrls: ['./client-side-filter.component.css']
})
export class ClientSideFilterComponent implements OnInit {
  filter$ = new BehaviorSubject("All");

  characters$: Observable<StarWarsCharacter[]> = this.starWarsService.getCharacters();

  filteredCharacters$ = this.characters$.combineLatest(
    this.filter$, (characters: StarWarsCharacter[], filter: string) => {
      if (filter === "All") return characters;
      console.log(characters);
      return characters.filter((character: StarWarsCharacter) => character.gender.toLowerCase() === filter.toLowerCase());
    })

  constructor(private starWarsService: StarWarsService) {
  }

  ngOnInit() {

  }

  filterChanged(value: string) {
    this.filter$.next(value);
  }

}
