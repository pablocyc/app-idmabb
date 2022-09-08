import "./components/CardParameter.js";
import "./components/ModalMenu.js";
import "./components/ModalSignup.js";
import "./components/ModalLogin.js";
import "./components/NavMenu.js";
import { getIdm, onGetIdms, statusAuth, auth } from "./firebase.js";

const container = document.querySelector(".container-cards");
const main = document.querySelector("main");
const btnAdd = document.querySelector(".btn-add");
const btnMenu = document.querySelector(".btn-menu");
const welcome = document.querySelector(".welcome-title");

// Components
main.appendChild(document.createElement("modal-menu"));
main.appendChild(document.createElement("nav-menu"));
main.appendChild(document.createElement("modal-login"));
main.appendChild(document.createElement("modal-signup"));
const modal = document.querySelector("modal-menu");
const navMenu = document.querySelector("nav-menu");
const login = document.querySelector("modal-login");
const signup = document.querySelector("modal-signup");


btnAdd.addEventListener("click", () => modal.classList.add("modal-show"));
btnMenu.addEventListener("click", () => {
  navMenu.classList.toggle("menu-show");
});
document.addEventListener("apply", e => setCards(e));
document.addEventListener("login", e => menuLogin(e));

function getValue(data) {
  const nominalValue = 250;
  const nominal = 16384;
  return nominalValue * data / nominal;
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
      getIdm("Volt_L1-N")
        .then((snapshot) => {
          const value = getValue(snapshot.data().current).toFixed(1);
          card.setValue(value);
        })
      flagCreateCard = true;
    }
  });
}

function menuLogin(e) {
  if (e.detail.name === "signupMenu") {
    signup.setAttribute("class", "modal-show");
  }

  if (e.detail.name === "loginMenu") {
    login.setAttribute("class", "modal-show");
  }

  if (e.detail.name === "loging" || e.detail.name === "signup") {
    welcome.innerText = `Welcome back, ${e.detail.userName}`;
  }
}

statusAuth(auth, user => {
  if (user) {
    console.log("user loged...");
    navMenu.statusAuth(true);
    welcome.innerText = `Welcome back, ${user.displayName}`;
    onGetIdms(snapshot => {
      const cards = container.querySelectorAll("card-parameter");
      snapshot.forEach( doc => {
        cards.forEach( card => {
          if (card.parameter === "L1-Neutro") {
            if (doc.id === "Volt_L1-N") {
              const value = getValue(doc.data().current).toFixed(1);
              card.setValue(value);
            }
          }
        });
      })
      // const len = snapshot.docs.length;
      // const last = snapshot.docs[len - 1];
      // console.log(snapshot.docs[3].data().current);
      // card.setValue(getValue(last.data().Value));
      // welcome.innerText = `Welcome!, (${getValue(snapshot.docs[3].data().current).toFixed(1)})`;
    });
  } else {
    navMenu.statusAuth(false);
  }
})
