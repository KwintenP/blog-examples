import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
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
  @Output()
  delete = new EventEmitter<StarWarsCharacter>();

  constructor() { }

  ngOnInit() {
  }

  onDelete(character: StarWarsCharacter): void {
    this.delete.emit(character);
  }
}
