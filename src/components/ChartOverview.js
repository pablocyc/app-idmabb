import Chart from "chart.js/auto";
import { animation } from "../modules/animationChart.js";

class ChartOverview extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.setup = {
      datasets: [
        {
          borderColor: "#ff6384",
          borderWidth: 1,
          radius: 0,
          data: [],
        }
      ]
    };
    this.config = {
      type: 'line',
      data: this.setup,
      options: {
        animation,
        interaction: {
          intersect: false
        },
        plugins: {
          legend: false
        },
        scales: {
          x: {
            type: "time",
          },
        }
      },
    };
  }

  static get styles() {
    return /* css */`
      :host {

      }
    `;
  }

  connectedCallback() {
    this.render();
    this.myChart = new Chart(
      this.shadowRoot.getElementById("myChart"),
      this.config
    );
  }

  setDataChart(range, data, label) {
    const newData = [];
    const length = range.length;
    console.log("Length: " + length);
    const options = {
      timeZone: "GMT", hour: 'numeric', minute: 'numeric', second: 'numeric',
    };
    const newRange = range.map( t => {
      return new Intl.DateTimeFormat('es-BO', options).format(t);
    });
    for (let i=0; i < length; i++) {
      newData.push({x: range[i], y: data[i]});
    }
    console.log("range: ", range[0]);
    console.log("newRange: ", newRange[0]);
    this.myChart.data.datasets[0].data = newData;
    this.myChart.update();
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${ChartOverview.styles}</style>
    <div class="container">
      <div class="chartCard">
        <div class="chartBox">
          <canvas height="250" id="myChart"></canvas>
        </div>
      </div>
    </div>`;
  }
}

customElements.define("chart-overview", ChartOverview);
