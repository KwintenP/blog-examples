import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StarWarsService} from "./services/star-wars.service";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [StarWarsService]
})
export class CommonLogicModule { }
