import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RetryComponent } from './retry/retry.component';
import {Routes, RouterModule} from "@angular/router";
import {CommonLogicModule} from "../../common-logic/common-logic.module";

const routes: Routes = [
  {
    path: '',
    component: RetryComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CommonLogicModule
  ],
  declarations: [RetryComponent]
})
export class RetryModule { }
