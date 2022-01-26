
// selectors 
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todolist");
const filterOption = document.querySelector(".filter-todos");
// event listeners 
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click",checkRemove);
filterOption.addEventListener("click",filterTodos);
document.addEventListener('DOMContentLoaded', getLocalTodos);

//function  addTodo:

function addTodo(e){
    e.preventDefault();     //    ⬅⬅⬅⬅⬅⬅⬅⬅     prevent to refresh everything that you type in input 
    // console.log(e);
//get todo value
//create new todo 
//add to Dom 
//reset Input 
//⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇
const todoDiv = document.createElement("div");
todoDiv.classList.add("todo");
const newTodo = `<li>${todoInput.value}</li>
<span><i class="fas fa-check-square"></i></span>
<span><i class="far fa-trash-alt"></i></span>`;
todoDiv.innerHTML = newTodo;
todoList.appendChild(todoDiv);
saveLocalTodos(todoInput.value);
todoInput.value = "";
}


//function Check:

function checkRemove(e){
    const classList =[...e.target.classList]; 
    const item = e.target 
    //console.log(item.parentElement.parentElement);
    if(classList[1] === "fa-check-square"){
        const todo = item.parentElement.parentElement;
        todo.classList.toggle("completed");
    }else if(classList[1] === "fa-trash-alt") {
        const todo = item.parentElement.parentElement;
        removeLocalTodos(todo);
        todo.remove();
    }

} 


// function filters  (when it comes to for drop down ):
function filterTodos(e){
    // console.log(e.target.value);
    console.log(todoList.childNodes);
    const todos = [...todoList.childNodes];
    todos.forEach(todo => {
    switch(e.target.value){
        case 'all':
            todo.style.display= 'flex';
            break;
        case 'completed':
            if(todo.classList.contains('completed')){
                todo.style.display = 'flex';
            }else{
                todo.style.display = 'none';
            }
            break;
        case 'uncompleted':
            if(!todo.classList.contains('completed')){
                todo.style.display = 'flex';
            }else{
                todo.style.display = 'none';
            }
            break;
    }
    });
}


// local 
function saveLocalTodos(todo){
    //localStorage.getItem('todos')
    //localStorage.setItem('todos',JSON.stringify(todos))

    let savedTodos = localStorage.getItem("todos") 
    ? JSON.parse(localStorage.getItem("todos"))
    : [];
    savedTodos.push(todo);
    localStorage.setItem('todos',JSON.stringify(savedTodos));
    // savedTodos.filter((todos) => todo !== todo.children[0].innerText);
}

// get  
function getLocalTodos(){

    let savedTodos = localStorage.getItem("todos") 
    ? JSON.parse(localStorage.getItem("todos"))
    : [];
    savedTodos.forEach(todos =>{
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    const newTodo = `
    <li>${todos}</li>
    <span><i class="fas fa-check-square"></i></span>
    <span><i class="far fa-trash-alt"></i></span>`;
    todoDiv.innerHTML = newTodo;
    todoList.appendChild(todoDiv);
    } )
    
}


function removeLocalTodos(todo){
    // console.log(todo.children[0].innerText);
    let savedTodos = localStorage.getItem("todos") 
    ? JSON.parse(localStorage.getItem("todos"))
    : [];
    const filterTodos= savedTodos.filter(
        (t) => t !== todo.children[0].innerText //1 !==2 , 2 !==2  
        );
    localStorage.setItem("todos", JSON.stringify(filterTodos));
}