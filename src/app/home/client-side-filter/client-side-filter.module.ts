import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {GenderFilterComponent} from "./gender-filter/gender-filter.component";
import {Routes, RouterModule} from "@angular/router";
import {ClientSideFilterComponent} from "./client-side-filter/client-side-filter.component";
import {CommonLogicModule} from "../../common-logic/common-logic.module";
import {ClientSideFilterWithoutStreamComponent} from "./client-side-filter-without-stream/client-side-filter-without-stream.component";

const routes: Routes = [
  {path: '', redirectTo: 'withStream'},
  {
    path: 'withoutStream',
    component: ClientSideFilterWithoutStreamComponent
  },
  {
    path: 'withStream',
    component: ClientSideFilterComponent
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CommonLogicModule
  ],
  declarations: [GenderFilterComponent, ClientSideFilterComponent, ClientSideFilterWithoutStreamComponent]
})
export class ClientSideFilterModule {
}
