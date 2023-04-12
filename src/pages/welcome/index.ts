const papel = require("../../img/papel.png");
const tijera = require("../../img/tijera.png");
const piedra = require("../../img/piedra.png");
import { Router } from "@vaadin/router";
export class Welcome extends HTMLElement {
   connectedCallback() {
      this.render();
   }
   render() {
      const div = document.createElement("div");
      const style = document.createElement("style");
      div.classList.add("contenedor");
      div.innerHTML = `
      <custom-title inicio="${"Piedra<br> Papel <span class='span-o'>o</span> Tijera"}"></custom-title>
      <div class="botones">
         <custom-boton class="btn" title="Nuevo Juego"></custom-boton>
         <custom-boton id="roomExist" class="btn" title="Ingresar a una sala"></custom-boton>
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
      this.appendChild(div);
      this.appendChild(style);

      const btn = div.querySelector(".btn");
      btn?.addEventListener("click", (e) => {
         Router.go("/codigoSala");
      });
      const roomExist = div.querySelector("#roomExist");
      roomExist?.addEventListener("click", (e) => {
         e.preventDefault();
         Router.go("/conectSala");
      });
   }
}
customElements.define("page-welcome", Welcome);
