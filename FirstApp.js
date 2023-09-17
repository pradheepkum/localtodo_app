const Button = document.getElementById("Submit");
const List = document.getElementById("dynElement");
const MsgInput = document.getElementById("MsgInput");
var StaticMessages = [];

function ButtonClick(){

  let InputText = MsgInput.value;
  if(!InputText){
    alert("Input is empty!!");
    return;
  }
  const NewCard = createCard(InputText);
  List.appendChild(NewCard);
  
  let findButtons = document.querySelectorAll(".Delete");
  // console.log("print the findbutton", findButtons);
  for(let i=0; i<findButtons.length; i++){
    findButtons[i].onclick = function() {
       this.parentElement.remove();
    }
  }
  MsgInput.value = "";

}
function createCard(Msg){
  let NewCard = document.createElement("div");
  let NewCardText = document.createElement("p");
  let NewCardDelete = document.createElement("button");
  NewCardDelete.innerHTML = "Delete";
  NewCardText.innerHTML = Msg;
  StaticMessages.push(Msg);
  sessionStorage.setItem("History", JSON.stringify(StaticMessages));
  NewCard.appendChild(NewCardText);
  NewCard.appendChild(NewCardDelete);
  NewCardDelete.className = "Delete";
  NewCard.className = "Item";  
  return NewCard;
}

MsgInput.onkeyup = (event) => {

  if(event.key === "Enter"){
    ButtonClick();
  }

};

Button.onclick = ButtonClick;

// ( ) => {
//   console.log(event);
//   let InputText = MsgInput.value;
//   if(!InputText){
//     alert("Input is empty!!");
//     return;
//   }
//   let NewCard = document.createElement("div");
//   let NewCardText = document.createElement("p");
//   let NewCardDelete = document.createElement("button");
//   NewCardDelete.innerHTML = "Delete";
//   NewCardText.innerHTML = InputText;
//   NewCard.appendChild(NewCardText);
//   NewCard.appendChild(NewCardDelete);
//   List.appendChild(NewCard);
//   NewCardDelete.className = "Delete";
//   NewCard.className = "Item";  
//   let findButtons = document.querySelectorAll(".Delete");
//   // console.log("print the findbutton", findButtons);
//   for(let i=0; i<findButtons.length; i++){
//     findButtons[i].onclick = function() {
//        this.parentElement.remove();
//     }
//   }
//   MsgInput.value = "";
// }

window.onload = ( ) => {
  
  let history = JSON.parse(sessionStorage.getItem("History"));

  for(let i of history){
    const NewCard = createCard(i);
    List.appendChild(NewCard);
  }

  let findButtons = document.querySelectorAll(".Delete");
  // console.log("print the findbutton", findButtons);
  for(let i=0; i<findButtons.length; i++){
    findButtons[i].onclick = function() {
       this.parentElement.remove();
       history.splice(i , 1)
       UpdateSession();
    }
  }
  
  function UpdateSession(){
    sessionStorage.setItem("History",JSON.stringify(history));
    window.location.reload();
  }

}

