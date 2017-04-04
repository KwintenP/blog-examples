import {Component, OnInit, Input} from '@angular/core';
import {StarWarsCharacter} from "../../common-logic/entities/star-wars.entity";

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css']
})
export class CharacterListComponent implements OnInit {
  @Input()
  characters: StarWarsCharacter[];
  @Input()
  deleteEnabled = false;

  constructor() { }

  ngOnInit() {
  }

  delete(): void {
    console.log("deleted");
  }
}
