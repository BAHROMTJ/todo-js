let url = "https://6264fc9e94374a2c506bde51.mockapi.io/";

let dialog = document.querySelector(".dialog");
let dialog2 = document.querySelector(".dialog2");
let add = document.querySelector(".add");
let form = document.querySelector(".form");
let contener = document.querySelector(".contener");
let arr = [];
let close = document.querySelector(".dclose");
let form1 = document.querySelector(".form1");

close.onclick = () => {
  dialog.close();
};

add.onclick = () => {
  dialog.show();
};

async function postfn(obj) {
  try {
 await axios.post(`${url}todos`, obj);
    getfn();
  } catch (error) {}
}

async function getfn() {
  try {
    let { data } = await axios.get(`${url}todos`);

    arr = [...data];

    render();
  } catch (error) {}
}

form.onsubmit = (Event) => {
  Event.preventDefault();
  let target = Event.target;

  let obj = {
    title: target.dtxt.value,
    comp: false,
  };
  postfn(obj);
  dialog.close();
};


// DELIT
async function dellit(id) {
  try {
    let { data } = await axios.delete(`${url}todos/${id}`);
    getfn();
  } catch (error) {}
}

// edit
async function edit(elem, id) {
  console.log(elem);
  dialog2.show();
  form1.dtxt.value = elem.title;

  form1.ok.onclick = async () => {
    alert("инро " + elem.title + " ба ин " + form1.dtxt.value + " иваз мекуни");
    elem.title = form1.dtxt.value;
    try {
     await axios.put(`${url}todos/${id}`, elem);
    } catch (error) {}

    dialog2.close();
    getfn();
  };
}

// chek
async function chekin(chek, id) {
  let todo = arr.find((elem) => elem.id == id);
  todo.comp = chek;

  try {
    await axios.put(`${url}todos/${id}`, todo);
    render();
  } catch (error) {}
}

function render() {
  let views = document.querySelector(".views");
  views.innerHTML = "";

  arr.forEach((elem) => {
    let chek = document.createElement("input");
    let div = document.createElement("div");
    let span = document.createElement("span");
    let btn = document.createElement("button");
    let del = document.createElement("button");
    let spandel = document.createElement("span");
    chek.type = "checkbox";
    del.innerText = "Del";
    div.classList.add("view");
    btn.classList.add("edit");
    span.classList.add("span");
    del.classList.add("del");
    span.innerHTML = elem.title;
    btn.innerHTML = "Edit";
    div.appendChild(chek);
    views.appendChild(div);
    div.appendChild(span);
    div.appendChild(spandel);

    spandel.appendChild(del);
    spandel.appendChild(btn);

    chek.checked = elem.comp;

    chek.onchange = () => {
      chekin(chek.checked, elem.id);
    };

    if (chek.checked) {
      span.classList.add("chek");
    }
    btn.onclick = () => {
      edit(elem, elem.id);
    };

    form1.close.onclick = () => {
      dialog2.close();
    };

    del.onclick = () => {
      alert(" АНИК УДАЛИТ МЕКУНЕД ХАМИНРО-- " + elem.title);
      dellit(elem.id);
    };
  });
}

getfn();
