import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {HomeComponent} from "./home/home.component";
import {SideNavComponent} from "./side-nav/side-nav.component";
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {path: 'home', pathMatch: 'full', redirectTo: '/home/client-side-filter'},
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'client-side-filter',
        loadChildren: 'app/home/client-side-filter/client-side-filter.module#ClientSideFilterModule'
      }
    ]
  },
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    HomeComponent,
    SideNavComponent,
    SideNavComponent
  ]
})
export class HomeModule {
}
