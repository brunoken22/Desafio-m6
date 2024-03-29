const papel = require("../../img/papel.png");
const tijera = require("../../img/tijera.png");
const piedra = require("../../img/piedra.png");
const fondo = require("../../img/fondo.png");

import { Router } from "@vaadin/router";
import { state } from "../../state";
class Play extends HTMLElement {
   async connectedCallback() {
      await this.render();
      const cs = await state.getState();

      cs.gameState.play = false;
      cs.gameState.opponentPlay = false;
      let num = 5;
      const conteo = setInterval(async () => {
         num--;
         const cs = await state.getState();
         if (num < 1) {
            clearInterval(conteo);
            await state.pushEstate();

            Router.go("/instruction");
         } else if (cs.gameState.opponentSelect && cs.gameState.youSelect) {
            clearInterval(conteo);
            const css = await state.getState();
            if (css.gameState.opponentSelect && css.gameState.youSelect) {
               if (state.nameTemp) {
                  await state.whoWins(
                     css.gameState.youSelect,
                     css.gameState.opponentSelect
                  );
                  Router.go("/result");
               } else {
                  setTimeout(() => {
                     Router.go("/result");
                  }, 600);
               }
            }
         }
      }, 1000);
   }
   async movies() {
      const hands = this.querySelectorAll(".selec") as any;
      for (let el of hands) {
         el.addEventListener("click", async (e) => {
            const countdown = this.querySelector(
               "custom-countdown"
            ) as HTMLElement;
            countdown.style.display = "none";

            for (let selec of hands) {
               if (selec.getAttribute("id") !== el.getAttribute("id")) {
                  selec.remove();
               }
            }
            const handss = this.querySelector(".hands") as any;
            // const handsss = e.target.shadowRoot
            //    .querySelector("div")
            //    .querySelector("img");
            // handsss.style.width = "100px";
            (el as any).style.cssText = " margin-top:-100px;opacity:1;";
            handss.style.justifyContent = "center";
            const cs = await state.getState();

            if (state.nameTemp === cs.gameState.name) {
               cs.gameState.youSelect = (e.target as any).id;
            } else {
               cs.gameState.opponentSelect = (e.target as any).id;
            }
            await state.pushEstate();
         });
      }
   }

   async render() {
      const style = document.createElement("style");
      this.classList.add("contenedor");
      document.body.style.backgroundImage = `url(${fondo})`;

      this.innerHTML = `
      <div class="oponent-hands">
      <custom-hand id="1" class="oponent-papel select-oponet" direction="${papel}" style="display:none" type="papel"></custom-hand>
      <custom-hand id="2" class="oponent-tijera select-oponet" type="tijera" direction="${tijera}" style="display:none"></custom-hand>
      <custom-hand id="3" class="oponent-piedra select-oponet" direction="${piedra}" type="piedra"  style="display:none"></custom-hand>
      </div>
      <custom-countdown class="countdown"></custom-countdown>
      <div class='hands'>
         <a href="#" id="papel" class="papel selec"><custom-hand id='papel' direction="${papel}"></custom-hand></a>
         <a href="#" id="tijera" class="tijera selec"><custom-hand id='tijera' direction="${tijera}"></custom-hand></a>
         <a href="#" id="piedra" class="piedra selec"><custom-hand id='piedra' direction="${piedra}"></custom-hand></a>
      </div>
      `;

      style.innerHTML = `
      body{
         opacity:1 !important;
      }
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
            justify-content: space-between;
         }
         
      }
    
      .piedra,.papel,.tijera{
         opacity:0.6;
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

      await this.movies();
   }
}
customElements.define("page-play", Play);
