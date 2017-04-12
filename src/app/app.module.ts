import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {AppComponent} from "./app.component";
import {TopNavComponent} from "./top-nav/top-nav.component";
import {RouterModule, Routes} from "@angular/router";
import {HomeModule} from "./home/home.module";
import {extraModules} from "../environments/environment";
import {Action, StoreModule} from "@ngrx/store";
import {combineReducersEnhanced} from "combine-reducers-enhanced";

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/home'},
  {
    path: 'home',
    loadChildren: 'app/home/home.module#HomeModule'
  }, {
    path: 'about',
    loadChildren: 'app/about/about.module#AboutModule'
  },
  {path: '**', redirectTo: '/home'}
];


export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
export const RESET = 'RESET';

export function counterReducer(state = 0, action: Action): number {
  switch (action.type) {
    case INCREMENT:
      return state + 1;
    case DECREMENT:
      return state - 1;

    case RESET:
      return 0;

    default:
      return state;
  }
}

const rootReducer = {
  data: {
    counter: counterReducer
  },
  test: {
    counter2: counterReducer
  }
};

const composedReducer = combineReducersEnhanced(rootReducer);

export function createRootReducer(state: any, action: any) {
  return composedReducer(state, action);
}

const importedModules = [
  BrowserModule,
  FormsModule,
  HttpModule,
  RouterModule.forRoot(routes, {enableTracing: false}),
  HomeModule,
  StoreModule.provideStore(createRootReducer)
];

@NgModule({
  declarations: [
    AppComponent,
    TopNavComponent
  ],
  imports: [...importedModules, extraModules],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
