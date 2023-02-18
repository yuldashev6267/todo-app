import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http";
import {todoFilter} from "../models/filter";
import {editTodoModel, todo, todoModel} from "../models/todo";
import {Observable, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TodoServiceService {
  private url: string = "http://localhost:7700"

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {

      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }

    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  constructor(private http: HttpClient) {
  }

  getTodos(filter: todoFilter, skip: number, limit: number):Observable<todo[]> {
    let url: string = `${this.url}/api/get/all?desc=${filter.desc}`

    if(filter.tag) {
      url += `&tag=${filter.tag}`
    }

    if (filter.colour != null) {
      url += `&colour=${filter.colour}`
    }

    if (filter.priority != null) {
      url += `&priority=${filter.priority}`
    }
    console.log(`${url}&skip=${skip}&limit=${limit}`)
    return this.http.get<todo[]>(`${url}&skip=${skip}&limit=${limit}`, {responseType: "json", observe: "body"})
  }

  getTodosCount(filter: todoFilter) : Observable<number> {
    let url: string = `${this.url}/api/get/count?desc=${filter.desc}`

    if(filter.tag) {
      url += `&tag=${filter.tag}`
    }

    if (filter.colour != null) {
      url += `&colour=${filter.colour}`
    }

    if (filter.priority != null) {
      url += `&priority=${filter.priority}`
    }

    return this.http.get<number>(`${url}`)
  }

  insertTodo(todo: todoModel) :Observable<todo> {
    return this.http.post<todo>(`${this.url}/api/create`, {
      title: todo.title,
      description: todo.description,
      colour: todo.colour,
      priority: todo.priority,
      tags: todo.tags
    })
  }

  searchTodo(text: string):Observable<todo> {
    return this.http.get<todo>(`${this.url}/api/get?searchText=${text}`)
  }

  completeTodo(id: number) {
    return this.http.post(`${this.url}/api/complete/${id}`, {})
  }

  deleteTodo(id: number) {
    return this.http.post(`${this.url}/api/delete/${id}`, {})
  }

  editTodo(todo: editTodoModel) : Observable<todo>{
    return this.http.post<todo>(`${this.url}/api/edit`, {
      id: todo.id,
      title: todo.title,
      description: todo.description,
      color: todo.colour,
      priority: todo.priority,
      tags:todo.tags
    })
  }

}
