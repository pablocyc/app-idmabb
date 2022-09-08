import { logout } from "../firebase.js";

class NavMenu extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  handleEvent(event) {
    const path = event.composedPath();
    if (event.type === "click") {
      if (path[0].classList.contains("menu-close") || path[0].classList.contains("menu-show")) {
        this.removeAttribute("class", "menu-show");
      }
      if (path[0].classList.contains("btn-login")) {
        this.removeAttribute("class", "menu-show");
        this.dispatchEvent(new CustomEvent("login", {
          bubbles: true,
          detail: {
            name: "loginMenu"
          }
        }));
      }
      if (path[0].classList.contains("btn-signup")) {
        this.removeAttribute("class", "menu-show");
        this.dispatchEvent(new CustomEvent("login", {
          bubbles: true,
          detail: {
            name: "signupMenu"
          }
        }));
      }
      if (path[0].classList.contains("btn-logout")) {
        document.location.reload();
        logout();
      }
    }
  }

  static get styles() {
    return /* css */`
      :host {
        position: fixed;
        top: 83px;
        width: 100%;
        height: 100%;
        right: 0;
        transform: translateX(100%);
        transition: transform 0.3s;
        background-color: transparent;
        padding-bottom: 1rem;
      }

      .container {
        background-color: #fff;
        margin-left: auto;
        width: 60%;
        display: flex;
        align-items: center;
        flex-direction: column;
      }

      button {
        border-style: none;
        background-color: transparent;
        cursor: pointer;
      }

      .nav-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        border-bottom: 1px solid var(--border-color);
      }

      .nav-header img {
        padding: 0.5rem;
      }

      .menu {
        list-style: none;
        padding: 0;
        margin: 0;
        margin-bottom: 1.5rem;
      }

      .menu-item {
        padding: 1em;
        border-bottom: 1px solid var(--button-color);
      }

      .menu-link {
        color: var(--text-color);
        text-decoration: none;
      }

      .btn-close {
        background: transparent;
      }

      .btn-close img {
        width: 24px;
        height: 24px;
      }

      .container-buttons {
        width: 90%;
      }

      .btn {
        font-size: 1rem;
        padding: 0.5rem;
        width: 100%;
        border-radius: 5px;
        margin-bottom: 1.5rem;
      }

      .btn-signup {
        background-color: var(--primary-color);
        color: white;
        margin-bottom: 0.5rem;
      }

      .btn-login {
        border: 1px solid var(--border-color);
        font-weight: 500;
      }

      .btn-logout {
        background-color: var(--error-color);
        color: white;
      }
    `;
  }

  connectedCallback() {
    this.render();
    this.container = this.shadowRoot.querySelector(".container");
    this.addEventListener("click", this);
  }

  statusAuth (auth) {
    this.container.removeChild(this.container.lastChild);
    const buttonsContainer = document.createElement("div");
    buttonsContainer.setAttribute("class", "container-buttons");
    this.container.appendChild(buttonsContainer);
    const btn = document.createElement("button");
    if (auth) {
      const btnLogout = btn.cloneNode();
      btnLogout.setAttribute("class", "btn btn-logout");
      btnLogout.textContent = "Log out";
      buttonsContainer.appendChild(btnLogout);
    } else {
      const btnSignup = btn.cloneNode();
      btnSignup.setAttribute("class", "btn btn-signup");
      btnSignup.textContent = "Sign up";
      const btnLogin = btn.cloneNode();
      btnLogin.setAttribute("class", "btn btn-login");
      btnLogin.textContent = "Log in";
      buttonsContainer.appendChild(btnSignup);
      buttonsContainer.appendChild(btnLogin);
    }
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${NavMenu.styles}</style>
    <div class="container">
      <div class="nav-header">
        <img src="vite.svg" alt="logo">
        <button id="btn-close" class="btn-close menu-close">
          <img src="icons/Close.svg" class="menu-close" alt="close">
        </button>
      </div>
      <ul class="menu" id="main-menu">
        <li class="menu-item"><a href="#" class="menu-link">Home</a></li>
        <li class="menu-item"><a href="#" class="menu-link">Product</a></li>
        <li class="menu-item"><a href="#" class="menu-link">Resources</a></li>
        <li class="menu-item"><a href="#" class="menu-link">Pricing</a></li>
      </ul>
      <div class="container-buttons">
      </div>
    </div>`;
  }
}

customElements.define("nav-menu", NavMenu);
