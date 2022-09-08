import { signup, updateUser } from "../firebase.js";

class ModalSignup extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  handleEvent(event) {
    const path = event.composedPath();
    if (event.type === "click") {
      if (path[0].classList.contains("button-close")) {
        this.removeAttribute("class");
      }
      if (path[0].classList.contains("login")) {
        this.removeAttribute("class", "menu-show");
        this.dispatchEvent(new CustomEvent("login", {
          bubbles: true,
          detail: {
            name: "loginMenu"
          }
        }));
      }
    }

    if (event.type === "submit") {
      event.preventDefault();

      this.name = this.shadowRoot.querySelector("#name").value;
      this.email = this.shadowRoot.querySelector("#email").value;
      this.pass = this.shadowRoot.querySelector("#password").value;

      signup(this.email, this.pass)
        .then((userCredential) => {
          this.form.reset();
          const user = userCredential.user;
          updateUser(user, {
            displayName: this.name
          })
            .then(() => console.log("update profile..."))
            .catch(err => console.log("error updating profile: ", err));

          this.dispatchEvent(new CustomEvent("login", {
            bubbles: true,
            detail: {
              name: "signup",
              userName: this.name
            }
          }));
          this.removeAttribute("class");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    }
  }

  static get styles() {
    return /* css */`
      :host {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #0005;
        transition: transform 0.3s ease-in-out;
        transform: scale(0);
      }

      .container {
        background-color: #fff;
        width: 85vw;
        position: relative;
      }

      .header {
        display: flex;
        margin-left: 2rem;
        margin-right: 1.2rem;
        margin-top: 0.5rem;
        justify-content: space-between;
        align-items: center;
        height: 2.5rem;
      }

      .button img {
        width: 24px;
        height: 24px;
      }

      button {
        border-style: none;
        background-color: transparent;
        cursor: pointer;
      }

      .main {
        margin: 1.5rem 2rem;
        margin-top: 0.5rem;
      }

      .title {
        margin: 0;
        font-size: 1.5rem;
      }

      .description {
        margin: 0;
        margin-top: 0.5rem;
        font-size: 0.8rem;
      }

      .form {
        margin-top: 1.5rem;

      }

      label {
        display: block;
        font-weight: 500;
        margin: 0.2rem 0;
      }

      label[for=email],
      label[for=password] {
        margin-top: 0.8rem;
      }

      input {
        width: 95%;
        height: 2.2rem;
        border-radius: 8px;
        border: 1px solid var(--border-color);
        padding-left: 0.5rem;
        font-size: 0.9rem;
      }

      .must {
        margin: 0;
        margin-top: 0.5rem;
        font-size: 0.8rem;
        font-weight: 400;
      }

      .btn-getstarter {
        width: 100%;
        margin-top: 1.5rem;
        background-color: var(--primary-color);
        color: white;
        font-size: 1rem;
        font-weight: 500;
        padding: 0.7rem;
        border-radius: 8px;
      }

      .already {
        text-align: center;
        font-size: 0.8rem;
        margin-top: 1.8rem;
      }

      .already span {
        color: var(--primary-color);
        font-weight: 700;
      }
    `;
  }

  connectedCallback() {
    this.render();
    this.addEventListener("click", this);
    this.form = this.shadowRoot.querySelector("#form");
    this.form.addEventListener("submit", this);
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${ModalSignup.styles}</style>
    <div class="container">
      <header class="header">
        <img src="vite.svg" alt="logo">
        <button class="button button-close">
          <img class="btn-close button-close" src="icons/Close.svg" alt="close">
        </button>
      </header>
      <main class="main">
        <h1 class="title">Sign up</h1>
        <p class="description">Start your 30-day free trial.</p>
        <form action="" id="form" class="form">
          <label for="name">Name*</label>
          <input type="text" id="name" name="name" placeholder="Enter your name" required>
          <label for="email">Email*</label>
          <input type="email" id="email" name="email" placeholder="Enter your email" required>
          <label for="password">Password*</label>
          <input type="password" id="password" name="password" placeholder="Create a password" minlength="6" required>
          <p class="must">Must be a least 6 characters.</p>
          <button class="btn-getstarter" type="submit">Get started</button>
        </form>
        <p class="already">Already have an account? <span class="login">Log in</span></p>
      </main>
    </div>`;
  }
}

customElements.define("modal-signup", ModalSignup);
