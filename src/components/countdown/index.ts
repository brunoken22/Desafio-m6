class Countdown extends HTMLElement {
   constructor() {
      super();
      this.render();
   }
   render() {
      const shadow = this.attachShadow({ mode: "open" });
      const div = document.createElement("div");
      div.classList.add("countdown");
      div.innerHTML = `
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
              font-family: 'Faster One', cursive;
              color: #000;
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

      let cantidad = 5;

      const countNumber = div.querySelector(".countdown-number") as any;
      let tiempo = setInterval(() => {
         cantidad--;

         countNumber.innerHTML = cantidad.toString();

         if (cantidad < 1) {
            clearInterval(tiempo);
         }
      }, 1000);
      shadow.appendChild(div);
      shadow.appendChild(style);
   }
}
customElements.define("custom-countdown", Countdown);
