const inputbox = document.getElementById("input-box");
const Listcontainers = document.getElementById("list-container");
function addTask(){
    if(inputbox.value === ''){
        alert("Write something!");
    }
    else{
        let li = document.createElement("li");
        li.innerText = inputbox.value;
        Listcontainers.appendChild(li);
        let span = document.createElement("span");
        span.innerText = "\u00d7";
        li.appendChild(span);
    } 
    inputbox.value ="";
    savedata();
}
Listcontainers.addEventListener("click", function(e){
    if(e.target.tagName ==="li"){
        e.target.classList.toggle("checked");
    }
    else if (e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        savedata();
    }
},false);

function savedata(){
    localStorage.setItem("Task", Listcontainers.innerHTML);
    }
    
   function showtask(){
    Listcontainers.innerHTML = localStorage.getItem("Task") || "";
   }

showtask();
