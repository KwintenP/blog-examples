import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterListComponent } from './character-list/character-list.component';
import { GenderFilterComponent } from './gender-filter/gender-filter.component';
import {Routes, RouterModule} from "@angular/router";
import { ClientSideFilterComponent } from './client-side-filter/client-side-filter.component';
import {CommonLogicModule} from "../../common-logic/common-logic.module";

const routes: Routes = [
  {
    path: '',
    component: ClientSideFilterComponent
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CommonLogicModule
  ],
  declarations: [CharacterListComponent, GenderFilterComponent, ClientSideFilterComponent]
})
export class ClientSideFilterModule { }
