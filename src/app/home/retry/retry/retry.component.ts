import { Component, OnInit } from '@angular/core';
import {StarWarsService} from "../../../common-logic/services/star-wars.service";
import {StarWarsCharacter} from "../../../common-logic/entities/star-wars.entity";
import {Observable} from "rxjs";

@Component({
  selector: 'app-retry',
  templateUrl: './retry.component.html',
  styleUrls: ['./retry.component.css']
})
export class RetryComponent implements OnInit {
  characters$: Observable<StarWarsCharacter[]>;

  constructor(private starWarsService: StarWarsService) { }

  ngOnInit() {
    this.characters$ = this.starWarsService.getCharactersAndFail();
  }

}
