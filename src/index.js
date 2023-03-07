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
      card.setAttribute("id", e.detail.id[index]);
      container.appendChild(card);
      getIdm(e.detail.id[index])
        .then((snapshot) => {
          card.setValue(snapshot.data());
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
    console.log("user logged...");
    navMenu.statusAuth(true);
    welcome.innerText = `Welcome back, ${user.displayName}`;
    onGetIdms(snapshot => {
      const cards = container.querySelectorAll("card-parameter");
      snapshot.forEach( doc => {
        cards.forEach( card => {
          if (card.id === doc.id) {
            card.setValue(doc.data(), doc.id);
          }
        });
      });
    });
  } else {
    navMenu.statusAuth(false);
  }
})
