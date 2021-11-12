//to control ids of list items
let id = 1;

//gral container
let container = document.getElementById("container");

//button submit
let submit = document.getElementById("buttonSubmit");

//button clear list
let clearList = document.getElementById("buttonClear");

//input
let input = document.getElementById("input");

//order list
let orderList = document.createElement("ol");
orderList.classList.add("orderList");

//list container
let listContainer = document.getElementById("listContainer");

//array strings in LocalStorage
let arrLocalStorage = [];

//create title , input container, buttons, list container
const App = () => {
  let title = document.createElement("h1");
  title.classList.add("title");
  title.setAttribute("id", "title");
  title.innerHTML = "To-Do List";

  let divInput = document.createElement("div");
  divInput.classList.add("inputs");

  let input = document.createElement("input");
  input.classList.add("input");
  input.setAttribute("type", "text");
  input.setAttribute("placeholder", "Write to do");
  input.setAttribute("id", "input");
  input.setAttribute("maxlength", "100");

  let buttonInputSubmit = document.createElement("button");
  buttonInputSubmit.classList.add("button");
  buttonInputSubmit.classList.add("submit");
  buttonInputSubmit.setAttribute("id", "buttonSubmit");
  buttonInputSubmit.innerHTML = "Submit";

  divInput.appendChild(input);
  divInput.appendChild(buttonInputSubmit);

  let buttonClearList = document.createElement("button");
  buttonClearList.classList.add("button");
  buttonClearList.classList.add("clear");
  buttonClearList.setAttribute("id", "buttonClear");
  buttonClearList.innerHTML = "Clear List";
  buttonClearList.disabled = true;

  let listContainer = document.createElement("div");
  listContainer.classList.add("listContainer");
  listContainer.setAttribute("id", "listContainer");

  container.appendChild(title);
  container.appendChild(divInput);
  container.appendChild(buttonClearList);
  container.appendChild(listContainer);

  //check if there is any item on the Local Storage
  createToDoFromLS();

  //call to event listenes button submit and clear list
  eventListenerSubmitClear(buttonInputSubmit, buttonClearList);
};

//submit and clear
const eventListenerSubmitClear = (buttonInputSubmit, buttonClearList) => {
  //click on submit , add to list
  buttonInputSubmit.addEventListener("click", () => {
    createToDo();
  });

  buttonClearList.addEventListener("click", () => {
    orderList.innerHTML = "";
    id = 0;
    document.getElementById("buttonClear").disabled = true;
    arrLocalStorage = [];
    localStorage.setItem("arrLocalStorage", JSON.stringify(arrLocalStorage));
  });
};

//check in LS if it has strings
const createToDoFromLS = () => {
  localStorage.getItem("arrLocalStorage") == undefined
    ? localStorage.setItem("arrLocalStorage", JSON.stringify(arrLocalStorage))
    : (arrLocalStorage = JSON.parse(localStorage.getItem("arrLocalStorage")));

  arrLocalStorage.forEach((input) => {
    createToDoComponents(input);
  });
};

//if a valid submit, create the component
const createToDo = () => {
  let input = document.getElementById("input");
  if (input.value != "") {
    arrLocalStorage = JSON.parse(localStorage.getItem("arrLocalStorage"));
    arrLocalStorage.push(input.value);
    localStorage.setItem("arrLocalStorage", JSON.stringify(arrLocalStorage));

    createToDoComponents(input.value);
  } else {
    alert("Insert something to do");
  }
};

//organize the line and calls components
const createToDoComponents = (value) => {
  //text of the item
  let li = createLi(id, value);

  //button to delete item
  let deleteItem = createButtonDelete(id);

  //button to check item
  let doneItem = createButtonDone(id);

  //button to reDo item
  let redoItem = createButtonRedo(id);

  //container of the element
  let divItem = createDiv(id, li, deleteItem, doneItem, redoItem);

  writeOnList(divItem);
  setEventListenerList(id, deleteItem, doneItem, redoItem);

  document.getElementById("buttonClear").disabled = false;

  document.getElementById("input").value = "";

  id++;
};

//create line in list
const createDiv = (id, li, deleteItem, doneItem, redoItem) => {
  let item = document.createElement("div");
  item.setAttribute("id", id);
  item.classList.add("listItem");
  item.appendChild(li);
  item.appendChild(deleteItem);
  item.appendChild(doneItem);
  item.appendChild(redoItem);
  return item;
};

//create text in line
const createLi = (id, value) => {
  let li = document.createElement("li");
  li.setAttribute("id", `li${id}`);
  li.classList.add("textInput");
  li.innerHTML = value;
  return li;
};

//create button delete in line
const createButtonDelete = (id) => {
  let deleteItem = document.createElement("button");
  deleteItem.setAttribute("id", `buttonDelete${id}`);
  deleteItem.classList.add("button");
  deleteItem.classList.add("delete");
  deleteItem.innerHTML = "Delete!";
  return deleteItem;
};

//create buuton its done in line
const createButtonDone = (id) => {
  let doneItem = document.createElement("button");
  doneItem.setAttribute("id", `buttonDone${id}`);
  doneItem.classList.add("button");
  doneItem.classList.add("done");
  doneItem.innerHTML = "It´s done!";
  return doneItem;
};

//create button redo in line
const createButtonRedo = (id) => {
  let redoItem = document.createElement("button");
  redoItem.setAttribute("id", `buttonRedo${id}`);
  redoItem.setAttribute("disabled", "true");
  redoItem.classList.add("button");
  redoItem.classList.add("redo");
  redoItem.innerHTML = "Re do";
  return redoItem;
};

//insert the line on the list
const writeOnList = (item) => {
  orderList.appendChild(item);
  document.getElementById("listContainer").appendChild(orderList);
};

//handle delete clear an reDo buttons
const setEventListenerList = (id, buttonDelete, buttonClear, buttonRedo) => {
  //remove from list and LS
  buttonDelete.addEventListener("click", () => {
    arrLocalStorage = JSON.parse(localStorage.getItem("arrLocalStorage"));
    arrLocalStorage = arrLocalStorage.filter(
      (string) => string != document.getElementById(`li${id}`).innerHTML
    );
    localStorage.setItem("arrLocalStorage", JSON.stringify(arrLocalStorage));
    document.getElementById(`${id}`).remove();
    if (orderList.innerHTML === "") {
      document.getElementById("buttonClear").disabled = true;
    }
  });

  //check the line with bg green , disale its done
  buttonClear.addEventListener("click", () => {
    document.getElementById(`li${id}`).classList.remove("taskRedo");

    document.getElementById(`li${id}`).classList.add("taskDone");
    buttonClear.disabled = true;
    buttonRedo.disabled = false;
  });

  //check the line with bg blue, disable redo
  buttonRedo.addEventListener("click", () => {
    document.getElementById(`li${id}`).classList.add("taskRedo");
    buttonClear.disabled = false;
    buttonRedo.disabled = true;
  });
};

App();
