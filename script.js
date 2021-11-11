//to control ids of list items
let id = 1;

//button submit
let submit = document.getElementById("buttonSubmit");

//button clear list
let clearList = document.getElementById("buttonClear");

//input
let input = document.getElementById("input");

//order list
let orderList = document.createElement("ol");
orderList.classList.add("orderList");

//order list Aux
let orderListAux = document.createElement("ol");
orderList.classList.add("orderList");

//list container
let listContainer = document.getElementById("listContainer");

submit.addEventListener("click", () => {
  if (input.value != "") {
    //items of the list
    let item = document.createElement("div");
    item.setAttribute("id", id);
    item.classList.add("listItem");

    let li = document.createElement("li");
    li.setAttribute("id", `li${id}`);
    li.classList.add("textInput");
    li.innerHTML = input.value;

    //button to delete item
    let deleteItem = document.createElement("button");
    deleteItem.setAttribute("id", `buttonDelete${id}`);
    deleteItem.classList.add("delete");
    deleteItem.innerHTML = "Delete!";

    //button to check item
    let doneItem = document.createElement("button");
    doneItem.setAttribute("id", `buttonDone${id}`);
    doneItem.classList.add("done");
    doneItem.innerHTML = "It´s done!";

    //button to reDo item
    let redoItem = document.createElement("button");
    redoItem.setAttribute("id", `buttonRedo${id}`);
    redoItem.setAttribute("disabled", "true");
    redoItem.classList.add("redo");
    redoItem.innerHTML = "Re do";

    item.appendChild(li);
    item.appendChild(deleteItem);
    item.appendChild(doneItem);
    item.appendChild(redoItem);

    input.value = "";

    writeOnList(item);
    eventListener(id, deleteItem, doneItem, redoItem);
    id++;
  } else {
    alert("Insert something :)");
  }
});

const writeOnList = (item) => {
  orderList.appendChild(item);
  listContainer.appendChild(orderList);
};

const eventListener = (id, buttonDelete, buttonClear, buttonRedo) => {
  buttonDelete.addEventListener("click", () => {
    document.getElementById(`${id}`).remove();
  });
  buttonClear.addEventListener("click", () => {
    buttonClear.disabled = true;
    buttonRedo.disabled = false;
  });
  buttonRedo.addEventListener("click", () => {
    buttonClear.disabled = false;
    buttonRedo.disabled = true;
  });
};
