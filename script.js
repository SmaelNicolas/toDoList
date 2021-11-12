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

  eventListenerSubmitClear(buttonInputSubmit, buttonClearList);
};

const eventListenerSubmitClear = (buttonInputSubmit, buttonClearList) => {
  buttonInputSubmit.addEventListener("click", () => {
    let input = document.getElementById("input");
    if (input.value != "") {
      //text of the item
      let li = createLi(id, input);

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

      buttonClearList.disabled = false;

      input.value = "";
      id++;
    } else {
      alert("Insert something to do");
    }
  });

  buttonClearList.addEventListener("click", () => {
    orderList.innerHTML = "";
    id = 0;
    document.getElementById("buttonClear").disabled = true;
  });
};

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

const createLi = (id, input) => {
  let li = document.createElement("li");
  li.setAttribute("id", `li${id}`);
  li.classList.add("textInput");
  li.innerHTML = input.value;
  return li;
};

const createButtonDelete = (id) => {
  let deleteItem = document.createElement("button");
  deleteItem.setAttribute("id", `buttonDelete${id}`);
  deleteItem.classList.add("button");
  deleteItem.classList.add("delete");
  deleteItem.innerHTML = "Delete!";
  return deleteItem;
};

const createButtonDone = (id) => {
  let doneItem = document.createElement("button");
  doneItem.setAttribute("id", `buttonDone${id}`);
  doneItem.classList.add("button");
  doneItem.classList.add("done");
  doneItem.innerHTML = "It´s done!";
  return doneItem;
};

const createButtonRedo = (id) => {
  let redoItem = document.createElement("button");
  redoItem.setAttribute("id", `buttonRedo${id}`);
  redoItem.setAttribute("disabled", "true");
  redoItem.classList.add("button");
  redoItem.classList.add("redo");
  redoItem.innerHTML = "Re do";
  return redoItem;
};

const writeOnList = (item) => {
  orderList.appendChild(item);
  document.getElementById("listContainer").appendChild(orderList);
};

const setEventListenerList = (id, buttonDelete, buttonClear, buttonRedo) => {
  //event listener button delete to do
  buttonDelete.addEventListener("click", () => {
    document.getElementById(`${id}`).remove();
    if (orderList.innerHTML === "") {
      document.getElementById("buttonClear").disabled = true;
    }
  });

  //event listener button clear to do
  buttonClear.addEventListener("click", () => {
    document.getElementById(`li${id}`).classList.remove("taskRedo");

    document.getElementById(`li${id}`).classList.add("taskDone");
    buttonClear.disabled = true;
    buttonRedo.disabled = false;
  });

  //event listener button re do to do
  buttonRedo.addEventListener("click", () => {
    document.getElementById(`li${id}`).classList.add("taskRedo");
    buttonClear.disabled = false;
    buttonRedo.disabled = true;
  });
};

App();
