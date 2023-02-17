import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterTodoComponent } from './filter-todo.component';

describe('FilterTodoComponent', () => {
  let component: FilterTodoComponent;
  let fixture: ComponentFixture<FilterTodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterTodoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
