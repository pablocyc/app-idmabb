import { login } from "../firebase.js";

class ModalLogin extends HTMLElement {
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
      if (path[0].classList.contains("signup")) {
        this.removeAttribute("class", "menu-show");
        this.dispatchEvent(new CustomEvent("login", {
          bubbles: true,
          detail: {
            name: "signupMenu"
          }
        }));
      }
    }

    if (event.type === "submit") {
      event.preventDefault();
      this.email = this.shadowRoot.querySelector("#email").value;
      this.pass = this.shadowRoot.querySelector("#password").value;

      login(this.email, this.pass)
        .then((userCredential) => {
          this.form.reset();
          const user = userCredential.user;
          this.dispatchEvent(new CustomEvent("login", {
            bubbles: true,
            detail: {
              name: "loging",
              userName: user.displayName
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

      label[for=password] {
        margin-top: 0.8rem;
      }

      input {
        width: 96%;
        height: 2.2rem;
        border-radius: 8px;
        border: 1px solid var(--border-color);
        padding-left: 0.5rem;
        font-size: 0.9rem;
      }

      input[type="password"] {
        letter-spacing: 4px;
      }

      .forgot {
        margin: 0;
        margin-top: 0.5rem;
        font-size: 0.8rem;
        font-weight: 700;
        color: var(--primary-color);
        text-align: right;
      }

      .btn-signin {
        width: 100%;
        margin-top: 1.5rem;
        background-color: var(--primary-color);
        color: white;
        font-size: 1rem;
        font-weight: 500;
        padding: 0.7rem;
        border-radius: 8px;
      }

      .dont {
        text-align: center;
        font-size: 0.8rem;
        margin-top: 1.8rem;
      }

      .dont span {
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
    <style>${ModalLogin.styles}</style>
    <div class="container">
      <header class="header">
        <img src="vite.svg" alt="logo">
        <button class="button button-close">
          <img class="btn-close button-close" src="icons/Close.svg" alt="close">
        </button>
      </header>
      <main class="main">
        <h1 class="title">Lon in</h1>
        <p class="description">Welcom back! Please enter your details.</p>
        <form method="post" action="" id="form" class="form">
          <label for="email">Email</label>
          <input type="email" id="email" name="email" placeholder="Enter your email" required>
          <label for="password">Password</label>
          <input type="password" id="password" name="password" placeholder="••••••" required>
          <p class="forgot">Forgot password</p>
          <button class="btn-signin" type="submit">Sign in</button>
        </form>
        <p class="dont">Don't have an account? <span class="signup">Sign up</span></p>
      </main>
    </div>`;
  }
}

customElements.define("modal-login", ModalLogin);
