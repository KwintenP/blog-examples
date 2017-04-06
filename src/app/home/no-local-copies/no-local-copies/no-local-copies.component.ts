import {Component, OnInit, ViewChild, AfterViewInit} from "@angular/core";
import {StarWarsService} from "../../../common-logic/services/star-wars.service";
import {StarWarsCharacter} from "../../../common-logic/entities/star-wars.entity";
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
import {CharacterListComponent} from "../../../common-logic/character-list/character-list.component";

@Component({
  selector: 'app-no-local-copies',
  templateUrl: './no-local-copies.component.html',
  styleUrls: ['./no-local-copies.component.css']
})
export class NoLocalCopiesComponent implements OnInit, AfterViewInit {
  actions$ = new Subject<Action>();
  characters$: Observable<StarWarsCharacter[]>;

  @ViewChild(CharacterListComponent)
  characterListComponent;

  constructor(private starWarsService: StarWarsService) {
  }

  ngOnInit() {
    this.characters$ = this.actions$.scan((acc: StarWarsCharacter[], action: Action) => {
      switch (action.type) {
        case "ADD_ALL":
          return action.payload;
        case "ADD":
          return [...acc, action.payload];
        case "REMOVE":
          acc.splice(acc.indexOf(action.payload), 1);
          return acc;
      }
    }, []);

    this.starWarsService.getCharacters()
      .map((characters) => new AddAllAction(characters))
      .subscribe(val => {
        this.actions$.next(val);
      });
  }

  ngAfterViewInit(): void {
    this.characterListComponent.delete.map((character: StarWarsCharacter) => new RemoveAction(character))
      .subscribe(this.actions$);
  }
}

class Action {
  type: string;
  payload: any;
}

class AddAllAction implements Action {
  type: "ADD_ALL" = "ADD_ALL";

  constructor(public payload: Array<StarWarsCharacter>) {
  }
}

class RemoveAction implements Action {
  type: "REMOVE" = "REMOVE";

  constructor(public payload: StarWarsCharacter) {
  }
}

class AddAction implements Action {
  type: "ADD" = "ADD";

  constructor(public payload: StarWarsCharacter) {
  }
}


