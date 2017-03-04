import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StarWarsService} from "./services/star-wars.service";
import {CharacterListComponent} from "./character-list/character-list.component";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CharacterListComponent],
  exports: [CharacterListComponent],
  providers: [StarWarsService]
})
export class CommonLogicModule { }
