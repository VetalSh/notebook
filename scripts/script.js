'use strict';

const todoControl = document.querySelector('.todo-control'),
      headerInput = document.querySelector('.header-input'),
      todoList = document.querySelector('.todo-list'),
      todoCompleted = document.querySelector('.todo-completed');

let todoData = [
  {
    value: 'To make coffee',
    completed: false
  },
  {
    value: 'To wash hands',
    completed: true
  },
];

// Get todoData from LocalStorage
function getData(){
  let todoDataStorage = JSON.parse(localStorage.myToDoData);
  return todoDataStorage;  
}

// getData();
console.log(getData());
todoData = getData();


const render = function() {
  todoList.textContent = '';
  todoCompleted.textContent = '';

  todoData.forEach(function(item) {
    const li = document.createElement('li');
    li.classList.add('todo-item');

    li.innerHTML = '<span class="text-todo">' + item.value + '</span>' +
      '<div class="todo-buttons">' +
        '<button class="todo-remove"></button>' +
        '<button class="todo-complete"></button>' +
      '</div>';

    if (item.completed) {
      todoCompleted.append(li);
    } else {
      todoList.append(li);
    }    

    const btnTodoComplete = li.querySelector('.todo-complete'),
          btnRecycleBin = li.querySelector('.todo-remove');

    btnTodoComplete.addEventListener('click', function() {
      item.completed = !item.completed;
      render();
    });

    // Delete element
    btnRecycleBin.addEventListener('click', function() {
      let index = todoData.indexOf(item);
      todoData.splice(index, 1);
      render();
    });
  });

  // Write todoData to LocalStorage
  console.log(JSON.stringify(todoData));
  localStorage.myToDoData = JSON.stringify(todoData);
};

// При нажатии на кнопку добавляем новое дело в список
todoControl.addEventListener('submit', function(event) {
  event.preventDefault();

  const newTodo = {
    value: headerInput.value,
    completed: false
  };

  // Функция добавления нового дела в массив дел
  if (headerInput.value === '') {
    alert('Задача не была введена!!!');
  } else {
    todoData.push(newTodo);
    headerInput.value = '';
  }  

  // Рендеринг списка дел
  render();  
});

render();