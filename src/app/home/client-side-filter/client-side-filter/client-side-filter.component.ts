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
  filter$;
  characters$;
  filteredCharacters$;

  constructor(private starWarsService: StarWarsService) {
  }

  ngOnInit() {

    // A-----M----F----N----
    this.filter$ = new BehaviorSubject("All");

    // -----C------
    this.characters$  = this.starWarsService.getCharacters();

    // A-----M----F----N----
    // ------C---------------
    // combine latest
    // A----f-----f----f-----  (f filtered char list)
    this.filteredCharacters$ = this.characters$.combineLatest(
      this.filter$, (characters: StarWarsCharacter[], filter: string) => {
        if (filter === "All") return characters;
        console.log(characters);
        return characters.filter((character: StarWarsCharacter) => character.gender.toLowerCase() === filter.toLowerCase());
      })
  }

  filterChanged(value: string) {
    this.filter$.next(value);
  }

}
