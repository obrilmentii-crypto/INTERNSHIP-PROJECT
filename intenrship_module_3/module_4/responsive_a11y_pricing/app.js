const toggle = document.getElementById("billingToggle");
const prices = document.querySelectorAll(".price");

let annual = false;

toggle.addEventListener("click", changeBilling);

toggle.addEventListener("keydown", function(e){

if(e.key===" " || e.key==="Enter"){

e.preventDefault();
changeBilling();

}

});

function changeBilling(){

annual=!annual;

toggle.setAttribute("aria-checked",annual);

toggle.textContent=annual
? "Annual Billing"
: "Monthly Billing";

prices.forEach(price=>{

const month=price.dataset.month;
const year=price.dataset.year;

price.textContent=annual
? `$${year}/yr`
: `$${month}/mo`;

});

}

const modal=document.getElementById("modal");
const closeBtn=document.getElementById("closeModal");
const modalText=document.getElementById("modalText");

let lastFocusedElement;

document.querySelectorAll(".openModal").forEach(button=>{

button.addEventListener("click",()=>{

lastFocusedElement=button;

modal.classList.remove("hidden");

modalText.textContent=
button.dataset.plan+" Plan selected.";

closeBtn.focus();

});

});

closeBtn.addEventListener("click",closeModal);

function closeModal(){

modal.classList.add("hidden");

lastFocusedElement.focus();

}

document.addEventListener("keydown",function(e){

if(modal.classList.contains("hidden")) return;

if(e.key==="Escape"){

closeModal();

}

if(e.key==="Tab"){

const focusable=modal.querySelectorAll("button");

const first=focusable[0];
const last=focusable[focusable.length-1];

if(e.shiftKey){

if(document.activeElement===first){

e.preventDefault();
last.focus();

}

}else{

if(document.activeElement===last){

e.preventDefault();
first.focus();

}

}

}

});