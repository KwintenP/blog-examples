import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { TopNavComponent } from './top-nav/top-nav.component';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home/home/home.component";
import {HomeModule} from "./home/home.module";
import { SideNavComponent } from './home/side-nav/side-nav.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/home'},
  {
    path: 'home',
    loadChildren: 'app/home/home.module#HomeModule'
  }, {
    path: 'about',
    loadChildren: 'app/about/about.module#AboutModule'
  },
  { path: '**', redirectTo: '/home'}
];


@NgModule({
  declarations: [
    AppComponent,
    TopNavComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes, {enableTracing: true}),
    HomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
