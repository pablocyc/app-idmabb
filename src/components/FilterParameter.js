class FilterParameter extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  handleEvent(event) {
    const classList = event.target.classList;
    if (classList.contains("btn")) {
      classList.toggle("active");
      const filterEvent = new CustomEvent("filter", {
        detail: { title: this.title, message: event.path[0].innerText },
        bubbles: true,
        composed: true
      });
      this.dispatchEvent(filterEvent);
    }
  }

  static get styles() {
    return /* css */`
      :host {
      }

      .container {
        border-bottom: 1px solid var(--text-color);
      }

      .main {
        padding: 0.5rem 1.5rem;
      }

      .title {
        margin: 8px 0;
        font-size: 1.2rem;
        font-weight: 700;
      }

      .buttons {
        display: flex;
        flex-wrap: wrap;
        gap: 0 12px;
      }

      .btn {
        border: 1.5px solid var(--text-color);
        background-color: transparent;
        cursor: pointer;
        padding: 8px 12px;
        margin: 8px 0;
      }

      .active {
        background-color: var(--text-color);
        color: var(--card-color);
      }

      .disable {
        opacity: 0.5;
        cursor: none;
      }
    `;
  }

  connectedCallback() {
    this.title = this.getAttribute("title") || "-";
    this.params = this.getAttribute("params").split(",");
    this.render();
    this.btns = this.shadowRoot.querySelectorAll(".btn");
    this.shadowRoot.querySelector(".buttons").addEventListener("click", this);
  }

  unSave(array) {
    array.forEach(item => {
      this.btns.forEach(btn => {
        if (btn.innerText === item) {
          btn.classList.toggle("active");
        }
      });
    });
  }

  getButtons(values) {
    let html = "";
    values.forEach(value => {
      html += /* html */`<button class="btn">${value}</button> `;
    });
    return html;
  }

  clear() {
    this.btns.forEach(btn => {
      btn.classList.remove("active");
    });
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${FilterParameter.styles}</style>
    <div class="container">
      <main class="main">
        <h1 class="title">${this.title}</h1>
        <div class="buttons">
          ${this.getButtons(this.params)}
        </div>
      </main>
    </div>`;
  }
}

customElements.define("filter-parameter", FilterParameter);
