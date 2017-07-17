import { Component, OnInit } from '@angular/core';
import {StarWarsService} from "../../../common-logic/services/star-wars.service";
import {StarWarsCharacter} from "../../../common-logic/entities/star-wars.entity";
import 'rx-devtools/add/operator/debug';
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-retry',
  templateUrl: './retry.component.html',
  styleUrls: ['./retry.component.css']
})
export class RetryComponent implements OnInit {
  charactersThatFail$: Observable<StarWarsCharacter[]>;
  characters$: Observable<StarWarsCharacter[]>;

  canLoad: boolean = false;

  constructor(private starWarsService: StarWarsService) { }

  ngOnInit() {
    this.characters$ = this.starWarsService.getCharacters();
    this.charactersThatFail$ = this.starWarsService.getCharactersAndFail();
  }

}
