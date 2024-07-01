const timeDisplayEl = $('#time-display');
const taskDisplayEl = $('#task-display');
const taskFormEl = $('#task-form');
const taskNameInputEl = $('#task-name-input');
const taskDescriptionInputEl = $('#task-description');
const taskDateInputEl = $('#taskDueDate');
const addTask = $('addtask')


// Retrieve tasks and nextId from localStorage
function readTasksFromStorage() {
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId")) || [];
console.log(taskList);
return taskList, nextId
}

// Todo: create a function to generate a unique task id
function generateTaskId() {
    return crypto.randomUUID();
}

// function readtasksFromStorage() {
//     let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
//     localStorage.setItem('tasks', JSON.stringify(tasks));
// };

// Todo: create a function to create a task card
function createTaskCard(task) {
    const taskCard = $('<div>')
    .addClass('card task-card draggable my-3')
    .attr('data-task-id', task.id);
  const cardHeader = $('<div>').addClass('card-header h4').text(task.name);
  const cardBody = $('<div>').addClass('card-body');
  const cardDescription = $('<p>')
    .addClass('card-text')
    .text(task.description);
  const cardDueDate = $('<p>')
  .addClass('card-text')
  .text(task.dueDate);
  const cardDeleteBtn = $('<button>')
    .addClass('btn btn-danger delete')
    .text('Delete')
    .attr('data-project-id', task.id);
  cardDeleteBtn.on('click', handleDeleteTask);

  if (task.dueDate && task.status !== 'done') {
    const now = dayjs();
    const taskDueDate = dayjs(task.dueDate, 'DD/MM/YYYY');

    // ? If the task is due today, make the card yellow. If it is overdue, make it red.
    if (now.isSame(taskDueDate, 'day')) {
      taskCard.addClass('bg-warning text-white');
    } else if (now.isAfter(taskDueDate)) {
      taskCard.addClass('bg-danger text-white');
      cardDeleteBtn.addClass('border-light');
    }

  cardBody.append(cardDescription, cardDueDate, cardDeleteBtn);
  taskCard.append(cardHeader, cardBody);
  return taskCard
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    $('.draggable').draggable({
        opacity: 0.7,
        zIndex: 100,
        // ? This is the function that creates the clone of the card that is dragged. This is purely visual and does not affect the data.
        helper: function (e) {
          // ? Check if the target of the drag event is the card itself or a child element. If it is the card itself, clone it, otherwise find the parent card  that is draggable and clone that.
          const original = $(e.target).hasClass('ui-draggable')
            ? $(e.target)
            : $(e.target).closest('.ui-draggable');
          // ? Return the clone with the width set to the width of the original card. This is so the clone does not take up the entire width of the lane. This is to also fix a visual bug where the card shrinks as it's dragged to the right.
          return original.clone().css({
            width: original.outerWidth(),
          });
        },
      });
}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {
    event.preventDefault();
    console.log(event);
      
        // ? Read user input from the form
        const taskName = taskNameInputEl.val().trim();
        const projectType = taskDescriptionInputEl.val(); // don't need to trim select input
        const projectDate = taskDateInputEl.val(); // yyyy-mm-dd format
      
        const newProject = {
          // ? Here we use a Web API called `crypto` to generate a random id for our project. This is a unique identifier that we can use to find the project in the array. `crypto` is a built-in module that we can use in the browser and Nodejs.    
          id: generateTaskId(),
          name: taskNameInputEl,
          description: taskDescriptionInputEl,
          dueDate: taskDateInputEl,
          status: 'to-do',
        };

    // (which means the task variable will be equal to `null`) and we will need it to be initialized to an empty array.


const task = readtasksFromStorage();
  tasks.push(newTask);

  // ? Save the updated task array to localStorage
  savetasksToStorage(tasks);

  // ? Print project data back to the screen
  printProjectData();

  // ? Clear the form inputs
  taskNameInputEl.val('');
  taskDescriptionInputEl.val('');
  taskDateInputEl.val('');
}


//  addTask.on('submit', handleAddTask);

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {
    const taskId = $(this).attr('data-project-id');
    const tasks = readTasksFromStorage();
  
    // ? Remove project from the array. There is a method called `filter()` for this that is better suited which we will go over in a later activity. For now, we will use a `forEach()` loop to remove the project.
    tasks.forEach((task) => {
      if (task.id === taskId) {
        tasks.splice(tasks.indexOf(task), 1);
      }
    });
}
  
//     // ? We will use our helper function to save the projects to localStorage
//     saveTasksToStorage(tasks);
  
//     // ? Here we use our other function to print projects back to the screen
//     printProjectData();
// }

// // Todo: create a function to handle dropping a task into a new status lane
// function handleDrop(event, ui) {
//  // ? Read projects from localStorage
//  const tasks = readtasksFromStorage();

//  // ? Get the project id from the event
//  const taskId = ui.draggable[0].dataset.taskId;

//  // ? Get the id of the lane that the card was dropped into
//  const newStatus = event.target.id;

//  for (let task of tasks) {
//    // ? Find the project card by the `id` and update the project status.
//    if (task.id === taskId) {
//      task.status = newStatus;
//    }
//  }
//  // ? Save the updated projects array to localStorage (overwritting the previous one) and render the new project data to the screen.
//  localStorage.setItem('tasks', JSON.stringify(tasks));
//  printProjectData();
// }

// function printProjectData() {
//     const tasks = readtasksFromStorage();
  
//     // ? Empty existing project cards out of the lanes
//     const todoList = $('#todo-cards');
//     todoList.empty();
  
//     const inProgressList = $('#in-progress-cards');
//     inProgressList.empty();
  
//     const doneList = $('#done-cards');
//     doneList.empty();
  
//     // ? Loop through projects and create project cards for each status
//     for (let task of tasks) {
//       if (task.status === 'to-do') {
//         todoList.append(createTaskCard(task));
//       } else if (task.status === 'in-progress') {
//         inProgressList.append(createTaskCard(task));
//       } else if (task.status === 'done') {
//         doneList.append(createTaskCard(task));
//       }
//     }
// }

// // Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
// $(document).ready(function () {

    
// // ? When the document is ready, print the project data to the screen and make the lanes droppable. Also, initialize the date picker.
//     // ? Print project data to the screen on page load if there is any
//     printProjectData();
  
//     $('#taskDueDate').datepicker({
//       changeMonth: true,
//       changeYear: true,
//     });
  
//     // ? Make lanes droppable
//     $('.lane').droppable({
//       accept: '.draggable',
//       drop: handleDrop,
//     });
// });
