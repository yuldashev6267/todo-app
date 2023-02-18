import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgbModule, NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {MainViewComponent} from './components/main-view/main-view.component';
import {RouterModule} from "@angular/router";
import {AddTodoComponent} from './components/add-todo/add-todo.component';
import {HttpClientModule} from "@angular/common/http";
import {CardComponent} from "./components/card/card.component";
import {FormsModule} from "@angular/forms";
import { FilterTodoComponent } from './components/filter-todo/filter-todo.component';
import {CommonModule} from "@angular/common";
@NgModule({
  declarations: [
    AppComponent,
    MainViewComponent,
    AddTodoComponent,
    CardComponent,
    FilterTodoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    NgbModule,
    CommonModule,
    FormsModule,
    NgbPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
