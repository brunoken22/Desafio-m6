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
         document.body.style.opacity = "0.5 ";

         const id = this.querySelector(".id") as HTMLInputElement;
         await state.obtenerGameState(id.value);
         const cs = await state.getState();
         const name = this.querySelector(".name") as HTMLInputElement;
         cs.gameState.rtdb = id.value;
         cs.gameState.opponentName = name.value;
         cs.gameState.opponentConect = true;

         await state.pushEstate();

         Router.go("/generSala");
      });
   }
   async render() {
      const style = document.createElement("style");
      this.classList.add("contenedor");
      this.innerHTML = `
      <custom-title inicio="${"Piedra<br> Papel <span class='span-o'>o</span> Tijera"}"></custom-title>
      <div>
         <input type="text" class="id input" placeholder="Ingrese el ID">
         <input type="text" class="name input" placeholder="Tu nombre ...">
         <custom-boton id="roomExist" class="btn" title="Ingresar"></custom-boton>
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
            width:300px;
            margin:0px auto;
            margin-bottom: 0;
            height: 100vh;

         }
      }
      .name{
      }
      .input{
         background-color:transparent;
         text-indent:10px;
         font-family: 'Odibee Sans', cursive;
         font-size:2.2rem;
         max-width:300px;
         height:70px;
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
      }
      @media(min-width:400px){
         .hand{
            justify-content: space-between;
         }
      }
      `;

      this.appendChild(style);
   }
}
customElements.define("page-connect-sala", ConnectSala);
