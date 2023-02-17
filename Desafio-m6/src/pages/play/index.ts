// import { state } from "../../state";
const papel = require("../../img/papel.png");
const tijera = require("../../img/tijera.png");
const piedra = require("../../img/piedra.png");
import { async } from "@firebase/util";
import { Router } from "@vaadin/router";
import { state } from "../../state";
class Play extends HTMLElement {
   async connectedCallback() {
      await this.render();
      const cs = await state.getState();
      if (cs.gameState.name === state.nameTemp) {
      }

      const conteo = setInterval(async () => {
         const countdown = this.querySelector(
            "custom-countdown"
         )?.shadowRoot?.querySelector(".countdown-number")?.textContent as any;

         if (countdown < 1) {
            const cs = await state.getState();
            if (cs.gameState.name === state.nameTemp) {
               cs.gameState.play = false;
               await state.pushEstate();
            } else {
               cs.gameState.opponentPlay = false;
               await state.pushEstate();
            }
            clearInterval(conteo);

            Router.go("/instruction");
         }
      }, 1000);

      const hands = this.querySelectorAll(".selec") as any;
      for (let el of hands) {
         el.addEventListener("click", (e) => {
            clearInterval(conteo);
            e.preventDefault();
            el.href = " ";
            for (let selec of hands) {
               if (selec.getAttribute("id") !== el.getAttribute("id")) {
                  selec.remove();
               }
            }

            const numAleatorio = Math.ceil(Math.random() * 3);

            (el as any).style.cssText =
               "margin-top:-70px;opacity:100%;justify-content: center;pointer-events: none;cursor: default";

            const countdown = this.querySelector(
               "custom-countdown"
            ) as HTMLElement;

            countdown.style.display = "none";
            const computHands = this.querySelectorAll(
               ".oponent-hands custom-hand"
            ) as any;

            const myPlay = (e.target as HTMLElement).getAttribute("id") as any;

            for (let ele of computHands) {
               if (Number(ele.getAttribute("id")) === numAleatorio) {
                  // state.setMove(myPlay, ele.getAttribute("type"));

                  ele.style.display = "block";
                  setTimeout(() => {
                     Router.go("/result");
                  }, 2000);
                  return ele;
               }
            }
         });
      }
   }
   async render() {
      const style = document.createElement("style");
      this.classList.add("contenedor");

      this.innerHTML = `
         <div class="oponent-hands">
            <custom-hand id="1" class="oponent-papel" direction="${papel}" style="display:none" type="papel"></custom-hand>
            <custom-hand id="2" class="oponent-tijera" type="tijera" direction="${tijera}" style="display:none"></custom-hand>
            <custom-hand id="3" class="oponent-piedra" direction="${piedra}" type="piedra"  style="display:none"></custom-hand>
         </div>
         <custom-countdown class="countdown"></custom-countdown>
         <div class='hands'>
            <a href="#" id="papel" class="papel selec"><custom-hand id='papel' direction="${papel}"></custom-hand></a>
            <a href="#" id="tijera" class="tijera selec"><custom-hand id='tijera' direction="${tijera}"></custom-hand></a>
            <a href="#" id="piedra" class="piedra selec"><custom-hand id='piedra' direction="${piedra}"></custom-hand></a>
         </div>
      `;

      style.innerHTML = `
      .contenedor{
         display:flex;
         flex-direction:column;
         text-align:center;
         justify-content: space-between;
         height: 100vh;
   
      }
      @media(min-width:400px){
         .contenedor{
            display:flex;
            flex-direction:column;
            width:300px;
            margin:0px auto;
            margin-bottom: 0;
            height: 100vh;
         }
      }
      .oponent-hands{
         transform: rotate(-180deg);
      }
   
      .hands{
         display:flex;
         justify-content: space-around;
         margin-top:0;
      }
      @media(min-width:400px){
         .hands{
            justify-content: space-center;
         }
         
      }
      .piedra,.papel,.tijera{
         opacity:50%;
      }
      .piedra:hover{
         margin-top:-50px;
         opacity:100%;
      }
      .tijera:hover{
         margin-top:-50px;
         opacity:100%;
      }
      .papel:hover{
         margin-top:-50px;
         opacity:100%;
   
      }
      `;
      this.appendChild(style);
   }
}
customElements.define("page-play", Play);
