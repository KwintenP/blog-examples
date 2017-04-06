import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CommonLogicModule} from "../../common-logic/common-logic.module";
import { NoLocalCopiesComponent } from './no-local-copies/no-local-copies.component';
import {Routes, RouterModule} from "@angular/router";

const routes: Routes = [
  {path: '', component: NoLocalCopiesComponent}
];


@NgModule({
  imports: [
    CommonModule,
    CommonLogicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [NoLocalCopiesComponent]
})
export class NoLocalCopiesModule { }
