import { Router } from "@vaadin/router";
import { state } from "../../state";
class Countdown extends HTMLElement {
   connectedCallback() {
      this.render();
      let cantidad = 5;

      const countNumber = this.querySelector(".countdown-number") as any;
      let tiempo = setInterval(async () => {
         cantidad--;

         countNumber.innerHTML = cantidad.toString();

         if (cantidad < 1) {
            clearInterval(tiempo);
         }
      }, 1000);
   }
   render() {
      this.classList.add("countdown");
      this.innerHTML = `
      <h3 class="countdown-number">5</h3>
      <svg class="svg">
        <circle class="circle" r="90" cx="165" cy="140"></circle>
        <circle class="svg-circle" r="90" cx="165" cy="140"></circle>
      </svg>
      `;

      const style = document.createElement("style") as any;
      style.innerHTML = `
          .countdown{
              margin: 0 auto;
              height:300px;
              display:flex;
              flex-direction:column;
              align-items:center;
            }
            .countdown-number {
              position: absolute;
              font-weight: 400;
              font-size: 72px;
              text-align: center;
              color: #000;
              top:32%;
            }
            
            .svg {  
              height: 280px;
              transform: rotateY(-180deg) rotateZ(-90deg);
            }
            .svg-circle{
              stroke-dasharray: 570px;
              stroke-dashoffset: 0px;
              stroke-linecap: round;
              stroke-width:15px;
              stroke: #000;
              fill: none;
              animation: countdown 5s linear infinite forwards;
            }
            .circle{
              fill:none;
              stroke: #F1F1F1;
              stroke-width:15px;
            }
            @keyframes countdown {
              f rom {
                stroke-dashoffset: 0px;
              }
              to {
                stroke-dashoffset: 580px;
              }
            }
    `;

      this.appendChild(style);
   }
}
customElements.define("custom-countdown", Countdown);
