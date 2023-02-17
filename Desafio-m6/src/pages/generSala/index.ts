const papel = require("../../img/papel.png");
const tijera = require("../../img/tijera.png");
const piedra = require("../../img/piedra.png");
const fondo = require("../../img/fondo.png");
import { async } from "@firebase/util";
import { Router } from "@vaadin/router";
import { state } from "../../state";
class GenerSala extends HTMLElement {
   async connectedCallback() {
      await state.subscribe(async () => {
         const cs = await state.getState();

         if (cs.gameState.opponentConect) {
            await this.render();
            Router.go("/instruction");
         }
      });
      await this.render();

      const cs = await state.getState();
      await state.listenersRoom(cs.gameState.rtdb);
   }

   async render() {
      const cs = await state.getState();
      const style = document.createElement("style");
      this.classList.add("contenedor");
      document.body.style.backgroundImage = `url(${fondo})`;
      document.body.style.backgroundColor = `inherit`;
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
      <div class="codigo-juego">
         <p>Compartí el Código</p>
         <h4 class="codigo">${cs.gameState.rtdb}</h4>
         <p>Con tu contrincante</p>
      </div>
      <div class='hand'>
         <custom-hand direction="${papel}"></custom-hand>
         <custom-hand direction="${tijera}"></custom-hand>
         <custom-hand direction="${piedra}"></custom-hand>
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

customElements.define("page-gene-sala", GenerSala);
