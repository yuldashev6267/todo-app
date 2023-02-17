import {Component} from '@angular/core';
import {todo} from "../../models/todo";
import {TodoServiceService} from "../../services/todo-service.service";
import {NavigationStart, Router, Event} from "@angular/router";
import {todoFilter} from "../../models/filter";
import {map} from "rxjs";

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css']
})
export class MainViewComponent {
  todos: todo[] = []

  addTodoTitle: string = "Add Todo"
  searchText = ""
  filter: todoFilter = {
    desc: false,
    tag: null,
    colour: null,
    priority: null
  }
  page: number = 1;
  limit: number = 9
  pageNumbers:number[] = []

  constructor(private todoService: TodoServiceService, private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.fetchTodos(this.filter, 0, 9)
      }
    })
  }

  ngOnInit(): void {
    this.todos = []
    this.fetchTodos(this.filter, this.recalculateSkip(this.page), this.limit)
    this.fetchTodoCount()
  }


  fetchTodos(filter: todoFilter, skip: number, limit: number) {
    let todos = this.todos
    this.todoService.getTodos(filter, skip, limit).subscribe({
      next(data) {
        data.map(el=>todos.push(el))
      },
      error(err) {
        console.log(err)
      }
    })

    return todos
  }

  fetchTodoCount() {
    let c = 0
    this.todoService.getTodosCount(this.filter).subscribe(count=>{
      for(let i = 1;i<=Math.ceil(count/this.limit);i++){
        this.pageNumbers.push(i)
      }
    })
    console.log(c)
  }

  searchTodos(searchText: string) {
    if (searchText.length > 0) {
      const todos: todo[] = []
      this.todoService.searchTodo(searchText).subscribe({
        next(data) {
          Object.values(data).map(todo => todos.push(todo))
        },
        error(err) {
          console.log(err)
        }
      })

      this.todos = todos
      return this.todos
    }

    this.todos = []
    return this.fetchTodos(this.filter, 0, 9)
  }

  onSubmit() {
    this.searchTodos(this.searchText)
  }

  onKey(event: any) {
    if (event.target.value.length > 0) {
      this.searchTodos(event.target.value)
    }

    if (event.target.value.length === 0) {
      this.searchTodos(event.target.value)
    }
  }

  completedTodo(todo: todo) {
    const vm = this
    this.todoService.completeTodo(todo.id).subscribe({
      error(err) {
        console.log(err)
      },
      complete() {
        vm.todos = []
        vm.fetchTodos(vm.filter, 0, 9)
      }
    })
  }

  deleteTodo(todo: todo) {
    const vm = this
    this.todoService.deleteTodo(todo.id).subscribe({
      error(err) {
        console.log(err)
      },
      complete() {
        vm.todos = []
        vm.fetchTodos(vm.filter, 0, 9)
      }
    })
    this.pageNumbers = []
    this.fetchTodoCount()
  }

  filterTodo(filterData: todoFilter) {
    this.filter = {
      desc: filterData.desc,
      tag: filterData.tag,
      colour: filterData.colour,
      priority: filterData.priority
    }
    this.todos = []
    this.fetchTodos(this.filter, 0, 9)
  }

  recalculateSkip(page:number): number {
    return (page-1 ) * this.limit
  }

  next() {
    this.page++
    console.log(this.page)
    this.todos = []
    console.log(this.todos)
    this.fetchTodos(this.filter, this.recalculateSkip(this.page), this.limit)
  }

  to(page: number) {
    this.page = page;
    this.todos = []
    this.fetchTodos(this.filter, this.recalculateSkip(this.page), this.limit)
  }

  previous() {
    this.page--
    this.todos = []
    this.fetchTodos(this.filter, this.recalculateSkip(this.page), this.limit)
  }
}
