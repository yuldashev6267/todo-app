import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainViewComponent} from "./components/main-view/main-view.component";
import {BrowserModule} from "@angular/platform-browser";
import {AddTodoComponent} from "./components/add-todo/add-todo.component";

const routes: Routes = [
  {
    path: "main-view",
    component: MainViewComponent
  },
  {
    path: "add-todo",
    component: AddTodoComponent,
    data: {title: "Add Todo"}
  },
  {
    path: "edit-todo",
    component: AddTodoComponent,
    data: {title: "Edit Todo", isEditable: true}
  },
  {
    path: "",
    redirectTo: "/main-view",
    pathMatch: "full"
  },
];

@NgModule({
  imports: [BrowserModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
