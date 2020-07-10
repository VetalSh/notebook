'use strict';

class ToDo {
  constructor(form, input, container, todoList, todoCompleted) {
    this.form = document.querySelector(form);
    this.input = document.querySelector(input);
    this.container = document.querySelector(container);
    this.todoList = document.querySelector(todoList);
    this.todoCompleted = document.querySelector(todoCompleted);
    this.todoData = new Map(JSON.parse(localStorage.getItem('toDoList')));
  }

  addToStorage() {
    localStorage.setItem('toDoList', JSON.stringify([...this.todoData]));
  }

  render() {
    this.todoList.textContent = '';
    this.todoCompleted.textContent = '';
    // console.log('lenth of todoData: ', this.todoData.size);
    this.todoData.forEach(this.createItem, this);
    this.addToStorage();
  }

  createItem(todo) {
    const li = document.createElement('li');
    li.classList.add('todo-item');
    li.key = todo.key;
    li.insertAdjacentHTML('beforeend', `
        <span class="text-todo">${todo.value}</span>
        <div class="todo-buttons">
          <button class="todo-remove"></button>
          <button class="todo-complete"></button>
        </div>
    `);

    if (todo.completed) {
      this.todoCompleted.append(li);
    } else {
      this.todoList.append(li);
    }
  }

  addToDo(e) {
    e.preventDefault();
    
    if (this.input.value.trim()) {
      const newTodo = {
        value: this.input.value,
        completed: false,
        key: this.generateKey(),
      };
      this.todoData.set(newTodo.key, newTodo);
      this.render();
      this.input.value = '';
    } else {
      alert('Задача не была введена!!! пустое дело добавить нельзя!');
    }
  }

  generateKey() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  deleteItem(str) {
    let requiredKey; // Ключ элемента, который будем удалять
    this.todoData.forEach((elem) => {
      if (elem.value === str) {
        requiredKey = elem.key;
      }
    });
    this.todoData.delete(requiredKey);
    this.render();
  }

  completedItem(str) {
    let requiredKey; // Ключ элемента, который будем перемещать
    this.todoData.forEach((elem) => {
      if (elem.value === str) {
        requiredKey = elem.key;
        if (!this.todoData.get(requiredKey).completed) {
          this.todoData.get(requiredKey).completed = true;
        } else {
          this.todoData.get(requiredKey).completed = false;
        }        
      }
    });
    this.render();
  }

  // В этой функции обработчик события определяет на какую кнопку нажали
  handler() {
    this.container.addEventListener('click', (event) => {
      let target = event.target;
      if (target.matches('.todo-remove')) {
        const parent = target.closest('.todo-item');
        let taskText = parent.querySelector('.text-todo').textContent;
        this.deleteItem(taskText);
      } else if (target.matches('.todo-complete')) {
        const parent = target.closest('.todo-item');
        let taskText = parent.querySelector('.text-todo').textContent;
        this.completedItem(taskText);
      }
    });
  }

  init() {
    this.form.addEventListener('submit', this.addToDo.bind(this));
    this.render();
    this.handler();
  }
}

const todo = new ToDo('.todo-control', '.header-input', '.todo-container', '.todo-list', '.todo-completed');

todo.init();