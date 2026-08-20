'use strict'
const input =document.getElementById('todoInput')
const button = document.getElementById('addButton')
const list = document.getElementById('todoList')

let todos =[]
const savedTodos = localStorage.getItem('todos')

// Todoを画面に表示
function displayTodo(todo) {

  const li = document.createElement('li')
  li.textContent = todo.text

  li.addEventListener('click', function(){
    todo.completed =!todo.completed
    li.classList.toggle('completed')
    localStorage.setItem('todos', JSON.stringify(todos)) 
  })

  // 削除ボタン表示
  const deleteButton = document.createElement('button')
  deleteButton.textContent = '削除'

  deleteButton.addEventListener('click', function() {
  const index = todos.indexOf(todo)
  todos.splice(index, 1)

  localStorage.setItem('todos', JSON.stringify(todos))
  
  li.remove()
})

  li.appendChild(deleteButton)
  list.appendChild(li)

}

// todoを追加
button.addEventListener('click', function() {

  //空欄ng
  if (input.value === '') {
    return
  }

  const todo = {
    text: input.value,
    completed:false
  }

  todos.push(todo)

  localStorage.setItem('todos', JSON.stringify(todos))
  displayTodo(todo)

  input.value = ''
})

//enterで追加できる
input.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    button.click()
  }
})

// 保存していたtodo表示
if (savedTodos){
  todos = JSON.parse(savedTodos)

  todos.forEach(function(todo) {
    displayTodo(todo)
  })
}

