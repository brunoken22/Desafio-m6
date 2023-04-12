const papel = require("../../img/papel.png");
const tijera = require("../../img/tijera.png");
const piedra = require("../../img/piedra.png");
const fondo = require("../../img/fondo.png");
import { Router } from "@vaadin/router";
import { state } from "../../state";
import { log } from "console";
const hands = ["papel", "piedra", "tijera"];
class Instruction extends HTMLElement {
   async connectedCallback() {
      await state.subscribe(async () => {
         console.log("subscribe instru");
         const cs = (await state.getState()) as any;
         if (cs.gameState.opponentPlay && cs.gameState.play) {
            await this.render();
            Router.go("/play");
         }
      });
      await this.render();

      const btn = this.querySelector(".btn") as any;

      btn?.addEventListener("click", async () => {
         const cs = await state.getState();

         if (cs.gameState.name === state.nameTemp) {
            cs.gameState.play = true;
            if (hands.includes(cs.gameState.youSelect)) {
               cs.gameState.youSelect = "";
            }
         } else {
            cs.gameState.opponentPlay = true;
            if (hands.includes(cs.gameState.opponentSelect)) {
               cs.gameState.opponentSelect = "";
            }
         }

         await state.pushEstate();

         if (cs.gameState.opponentPlay && cs.gameState.play) {
            Router.go("/play");
         } else {
            const instruction = this.querySelector(
               ".instruction"
            ) as HTMLElement;
            instruction.style.display = "none";
            const espera = this.querySelector(".espera") as HTMLElement;
            espera.style.display = "block";
         }
      });
   }

   async render() {
      const cs = await state.getState();
      const style = document.createElement("style");
      this.classList.add("contenedor");
      document.body.style.backgroundImage = `url(${fondo})`;
      document.body.style.backgroundColor = `inherit`;
      //"Presioná jugar y elegí: piedra, papel o tijera antes de que pasen los 5 segundos.
      this.innerHTML = `
      <div class="detalles">
      <div>
         <p>${cs.gameState.name} ${
         cs.gameState.name ? ": " + cs.score.you : ""
      }</p>
         <p class="oponent">${cs.gameState.opponentName} ${
         cs.gameState.opponentName ? ": " + cs.score.oponent : ""
      }</p>
      </div>
      <div> 
         <p>Sala</p>
         <p class="codigo">${cs.gameState.rtdb}</p>
      </div>
   </div>
      <div class="instruction">
         <custom-title inicio="Presioná jugar y elegí: piedra, papel o tijera antes de que pasen los 5 segundos."></custom-title>
         <custom-boton class="btn" title="¡Jugar!"></custom-boton>
      </div>
      <div class="espera" style="display:none">
         <h2 style ="font-size:2.5rem">Esperando jugador ...</h2>
      </div>
      <div class='hand'>
         <custom-hand direction="${papel}"></custom-hand>
         <custom-hand direction="${tijera}"></custom-hand>
         <custom-hand direction="${piedra}"></custom-hand>
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
         width:500px;
         margin:0px auto;
         margin-bottom: 0;
         height: 100vh;
         padding-top:20px;
      }
   }
   .detalles{
      display:flex;
      justify-content:space-between;
      align-items:center;  
      font-size:2rem;
   }

   .codigo-juego{
      display:grid;
      font-size:2.5rem;
      gap:15px;
   }
   .codigo-juego h4{
      font-size:3rem
      
   }
   .instruction{
      margin-top:5.5rem;
   }
   .hand{
      display:flex;
      justify-content: space-around;
      margin-top:2.6rem;
   }
   @media(min-width:400px){
      .hand{
         margin-top:4rem;

         justify-content: space-between;
      }
   }
      `;
      this.appendChild(style);
   }
}
customElements.define("page-instruction", Instruction);
