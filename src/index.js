import "./components/CardParameter.js";
import "./components/ModalMenu.js";
import { getIdm, getIdms, onGetIdms } from "./firebase.js";

const container = document.querySelector(".container-cards");
const modal = document.querySelector("modal-menu");
const btnAdd = document.querySelector(".btn-add");

btnAdd.addEventListener("click", () => modal.classList.add("modal-show"));
document.addEventListener("apply", e => setCards(e));

// onGetIdms(snapshot => {
//   const len = snapshot.docs.length;
//   const last = snapshot.docs[len - 1];
//   console.log(last.data());
//   card.setValue(getValue(last.data().Value));
// });

function getValue(value) {
  const nominalValue = 250;
  const nominal = 16384;
  let real = value * nominalValue / nominal;
  return real.toFixed(2);
}


function setCards(e) {
  let flagCreateCard = true;
  e.detail.filters.forEach((item, index) => {
    container.childNodes.forEach(card => {
      if (card.getAttribute("parameter") === item) {
        container.removeChild(card);
        flagCreateCard = false;
      }
    });
    if (flagCreateCard) {
      const card = document.createElement("card-parameter");
      card.setAttribute("title", e.detail.title[index]);
      card.setAttribute("parameter", item);
      card.setAttribute("value", "0");
      container.appendChild(card);
      flagCreateCard = true;
    }
  });
}
