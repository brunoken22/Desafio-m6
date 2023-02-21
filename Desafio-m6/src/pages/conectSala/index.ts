const papel = require("../../img/papel.png");
const tijera = require("../../img/tijera.png");
const piedra = require("../../img/piedra.png");
import { Router } from "@vaadin/router";
import { state } from "../../state";
export class ConnectSala extends HTMLElement {
   async connectedCallback() {
      await this.render();

      const btn = this.querySelector(".btn");
      btn?.addEventListener("click", async (e) => {
         e.preventDefault();
         const id = this.querySelector(".id") as HTMLInputElement;
         await state.listenersRoom(id.value);
         setTimeout(async () => {
            const cs = await state.getState();
            const name = this.querySelector(".name") as HTMLInputElement;
            cs.gameState.rtdb = id.value;
            cs.gameState.opponentName = name.value;
            cs.gameState.opponentConect = true;
            await state.pushEstate();

            Router.go("/generSala");
         }, 2000);
      });
   }
   async render() {
      const div = document.createElement("div");
      const style = document.createElement("style");
      div.classList.add("contenedor");
      div.innerHTML = `
      <custom-title inicio="${"Piedra<br> Papel <span class='span-o'>o</span> Tijera"}"></custom-title>
      <input type="text" class="id input" placeholder="Ingrese el ID">
      <input type="text" class="name input" placeholder="Tu nombre ...">
      <custom-boton id="roomExist" class="btn" title="Ingresar"></custom-boton>
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
            width:300px;
            margin:0px auto;
            margin-bottom: 0;
            height: 82vh;
         }
      }
      .input{
         text-indent:10px;
         font-family: 'Odibee Sans', cursive;
         font-size:3rem;
         width:322px;
         height:87px;
         border: 5px solid #001997;
         border-radius:10px;
         margin-bottom:10px;
      }
      @media(min-width:400px){
         .input{
            width:100%;
         }
      }
      .hand{
         display:flex;
         justify-content: space-around;
         margin-top:3rem;
      }
      @media(min-width:400px){
         .hand{
            margin-top:9.2rem;
            justify-content: space-between;
         }
      }
      `;

      this.appendChild(style);
      this.appendChild(div);
   }
}
customElements.define("page-connect-sala", ConnectSala);
