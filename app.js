// Define UI variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();


// -----  loadEventsListers function  -----
function loadEventListeners() {
  // DOM Load event - calls getTasks fuction to load tasks from localStorage
  document.addEventListener('DOMContentLoaded', getTasks);
  // Add task event
  form.addEventListener('submit', addTask);
  // Remove task event
  taskList.addEventListener('click', removeTask);
  // Clear task event
  clearBtn.addEventListener('click', clearTasks);
  // Filter tasks event
  filter.addEventListener('keyup', filterTasks);
}

// -----  getTasks function  -----
function getTasks() {
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks = JSON.parse(localStorage.getItem('tasks'));
  console.log(tasks);
  tasks.forEach(function(task){
    // Create li element
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    // Create text node and append to li
    li.appendChild(document.createTextNode(task));
    // Create new link element
    const link = document.createElement('a');
    // Add class
    link.className = 'delete-item secondary-content';
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append the link to li
    li.appendChild(link);
    
    // Append li to ul
    taskList.appendChild(li);
  })
}
// -----  addTask function  -----
function addTask(e) {
  // if input is blank alert client, else add task
  if(taskInput.value === '') {
    alert('Add a task');
  } else {
    // Create li element
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    // Create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    // Create new link element
    const link = document.createElement('a');
    // Add class
    link.className = 'delete-item secondary-content';
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append the link to li
    li.appendChild(link);

    // Append li to ul
    taskList.appendChild(li);

    // Store task in Local Storage
    storeTaskInLocalStorage(taskInput.value); 

    // Clear input
    taskInput.value = '';
  }
  e.preventDefault();
}

// -----  storeTaskInLocalStorage function  -----
function storeTaskInLocalStorage(task) {
  let tasks;
  // if tasks in localStorage is empty, declare tasks as array & add new task
  // else parse tasks from localStorage & add new task
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);

  // parse array back to string for storage in localStorage
  localStorage.setItem('tasks', JSON.stringify(tasks));
}


// -----  removeTask function  -----
function removeTask(e) {
  if(e.target.parentElement.classList.contains('delete-item')) {
    if(confirm('Are you sure?')) {
      console.log(e.target.parentElement.parentElement);
      e.target.parentElement.parentElement.remove();
      // remove item from localStorage 
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
  console.log(e.target);
}

// -----  removeTaskFromLocalStorage function  -----
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task, index) {
    if(taskItem.textContent === task){
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));

  console.log(taskItem);
}

// -----  clearTasks function  -----
function clearTasks(e) {
  // two different approaches to removing tasks
  // this approach simply sets innerHTML of ul to nothing
  //taskList.innerHTML = '';

  // this approach loops through ul, removing li's (is also quicker!)
  while(taskList.firstChild) {
    taskList.firstChild.remove();
  }

  // https://jsperf.com/innerhtml-vs-removechild 

  // Clear from Local Storage
  clearTaskFromLocalStorage();
}


// -----  clearTaskFromLocalStorage  -----
function clearTaskFromLocalStorage() {
  localStorage.clear();
}
// -----  filterTasks fuction  -----
function filterTasks(e) {
  // retrieve text & convert to lowercase
  const text = e.target.value.toLowerCase();
  // iterate over collection of items
  document.querySelectorAll('.collection-item').forEach(function(task){
    const item = task.firstChild.textContent;
    // compare task with text - display match, otherwise don't dispaly
    if(item.toLowerCase().indexOf(text) != -1){
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}