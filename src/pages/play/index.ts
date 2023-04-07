const papel = require("../../img/papel.png");
const tijera = require("../../img/tijera.png");
const piedra = require("../../img/piedra.png");
import { Router } from "@vaadin/router";
import { state } from "../../state";
type Hands = "tijera" | "piedra" | "papel";
class Play extends HTMLElement {
   async connectedCallback() {
      const cs = await state.getState();
      await state.listenersRoom(cs.gameState.rtdb);

      await state.subscribe(async () => {
         const cs = await state.getState();
         if (cs.gameState.opponentSelect && cs.gameState.youSelect) {
            this.render();
            console.log("hola3");

            Router.go("/result");
            return;
         }
      });
      this.render();
      let num = 5;
      const conteo = setInterval(async () => {
         num--;
         const cs = await state.getState();
         if (num < 1) {
            clearInterval(conteo);
            Router.go("/instruction");
            const cs = await state.getState();
            cs.gameState.play = false;
            cs.gameState.youSelect = "";
            cs.gameState.opponentPlay = false;
            cs.gameState.opponentSelect = "";
            await state.pushEstate();
         } else if (cs.gameState.opponentSelect && cs.gameState.youSelect) {
            clearInterval(conteo);
            console.log("hola2");
            Router.go("/result");
            return;
         }
      }, 1000);
      await this.movies();
   }
   async movies() {
      const hands = this.querySelectorAll(".selec") as any;
      for (let el of hands) {
         el.addEventListener("click", async (e: any) => {
            e.preventDefault();

            // const countdown = this.querySelector(
            //    "custom-countdown"
            // ) as HTMLElement;
            // countdown.style.display = "none";

            for (let selec of hands) {
               if (selec.getAttribute("id") !== el.getAttribute("id")) {
                  selec.remove();
               }
            }
            (el as any).style.cssText =
               "margin-top:-70px;opacity:100%;justify-content: center;pointer-events: none;cursor: pointer";

            const cs = await state.getState();

            if (state.nameTemp === cs.gameState.name) {
               cs.gameState.youSelect = (e.target as any).id;
               await state.pushEstate();
            } else {
               cs.gameState.opponentSelect = (e.target as any).id;
               await state.pushEstate();
            }
            if (cs.gameState.opponentSelect && cs.gameState.youSelect) {
               console.log("hola1");
               const cs = await state.getState();

               const ganador = state.whoWins(
                  cs.gameState.youSelect,
                  cs.gameState.opponentSelect
               );

               if (ganador === "true") {
                  cs.score.you++;
                  await state.pushEstate();
               } else if (ganador === "false") {
                  cs.score.oponent++;
                  await state.pushEstate();
               }
               // Router.go("/result");
               // return;
            }
         });
      }
   }

   // <custom-countdown class="countdown"></custom-countdown>
   render() {
      const style = document.createElement("style");
      this.classList.add("contenedor");

      this.innerHTML = `
      <div class="oponent-hands">
         <custom-hand id="1" class="oponent-papel select-oponet" direction="${papel}" style="display:none" type="papel"></custom-hand>
         <custom-hand id="2" class="oponent-tijera select-oponet" type="tijera" direction="${tijera}" style="display:none"></custom-hand>
         <custom-hand id="3" class="oponent-piedra select-oponet" direction="${piedra}" type="piedra"  style="display:none"></custom-hand>
      </div>
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
