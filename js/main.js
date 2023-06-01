let dialog=document.querySelector(".dialog")
let dialog2=document.querySelector(".dialog2")
let add=document.querySelector(".add")
let form=document.querySelector(".form")
let contener=document.querySelector(".contener")
let arr=[]
let close=document.querySelector(".dclose")


close.onclick=()=>{
    dialog.close();   
}

add.onclick=()=>{
    dialog.show();
   
}

form.onsubmit=(Event)=>{
  
    Event.preventDefault();
    let target=Event.target
   
    let obj={
    id:new Date().getTime(),
  name:target.dtxt.value,
comp:false,
    }
    arr.push(obj)
render()
dialog.close();
}

function render() {
    let views=document.querySelector(".views")
 views.innerHTML=""

arr.forEach(elem => {
let chek=document.createElement("input")
let div=document.createElement("div")
let span=document.createElement("span")
let btn=document.createElement("button")
let del=document.createElement("button")
let spandel=document.createElement("span")
chek.type="checkbox"
del.innerText="Del"
div.classList.add('view')
btn.classList.add("edit")
span.classList.add('span')
del.classList.add('del')
span.innerHTML=elem.name
btn.innerHTML='Edit'
div.appendChild(chek)
views.appendChild(div)
div.appendChild(span)
div.appendChild(spandel)

spandel.appendChild(del)
spandel.appendChild(btn)

chek.checked=elem.comp

  chek.onclick=()=>{
    if (chek.checked) {
span.classList.add('chek')
 
	}
	else {
    span.classList.remove('chek')

	}
  }

btn.onclick=()=>{
    let form1=document.querySelector(".form1")

    dialog2.show()
  form1.dtxt.value=elem.name
form1.ok.onclick=()=>{
   alert( "инро "+elem.name+" ба ин "+ form1.dtxt.value+' иваз мекуни')
   elem.name=form1.dtxt.value
   
    dialog2.close()
 render() 
   
}

form1.close.onclick=()=>{
  dialog2.close()
 }
 

}

del.onclick=()=>{
    alert(' АНИК УДАЛИТ МЕКУНЕД ХАМИНРО-- '+elem.name)
    del(elem.id)
   function del (id) {
    arr=arr.filter(elem=>elem.id!==id)
    render()
   }

}
// let view=document.querySelector(".view")
// view.innerHTML=""

});

}