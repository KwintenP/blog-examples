import { Component, OnInit } from '@angular/core';
import {StarWarsService} from "../../../common-logic/services/star-wars.service";
import {StarWarsCharacter} from "../../../common-logic/entities/star-wars.entity";

@Component({
  selector: 'app-client-side-filter-without-stream',
  templateUrl: './client-side-filter-without-stream.component.html',
  styleUrls: ['./client-side-filter-without-stream.component.css']
})
export class ClientSideFilterWithoutStreamComponent implements OnInit {
  characters: Array<StarWarsCharacter>;
  filteredCharacters: Array<StarWarsCharacter>;

  constructor(private starWarsService: StarWarsService) {
  }

  ngOnInit() {
    this.starWarsService.getCharacters()
      .subscribe((fetchedCharacters) => {
          this.characters = fetchedCharacters;
          this.filteredCharacters = fetchedCharacters;
      })
  }

  filterChanged(value: string) {
    if (value === "All") {
      this.filteredCharacters = this.characters;
    } else {
      this.filteredCharacters = this.characters.filter((character: StarWarsCharacter) => character.gender.toLowerCase() === value.toLowerCase());
    }
  }
}
