const papel = require("../../img/papel.png");
const tijera = require("../../img/tijera.png");
const piedra = require("../../img/piedra.png");
import { Router } from "@vaadin/router";
class Error extends HTMLElement {
   connectedCallback() {
      this.render();

      const btn = this.querySelector(".btn");
      btn?.addEventListener("click", async () => {
         Router.go("/welcome");
      });
   }
   render() {
      const style = document.createElement("style");
      this.classList.add("contenedor");
      this.innerHTML = `
         <custom-title inicio="${"Piedra<br> Papel <span class='span-o'>o</span> Tijera"}"></custom-title>
         <div>
            <custom-title class="titulo-error" inicio="Ups, esta sala está completa y tu nombre no coincide con nadie en la sala."></custom-title>
            <custom-boton class="btn" title="Volver!"></custom-boton>
         </div>
         <div class='hand'>
            <custom-hand direction="${papel}"></custom-hand>
            <custom-hand  direction="${tijera}"></custom-hand>
            <custom-hand direction="${piedra}"></custom-hand>
         </div>
      `;

      // <div class="notification is-success error" style="display:none">
      //    <button class="delete"></button>
      //    Minimo 3 caracteres
      // </div>;
      style.innerHTML = `
      
      .contenedor{
         
         display:flex;
         flex-direction:column;
         text-align:center;
         justify-content: space-between;
         height: 100vh;

      }
      @media(min-width:325px){
         .contenedor{
            display:flex;
            flex-direction:column;
            width:300px;
            height: 100vh;
            margin:0 auto;
         }
      }

      .hand{
         display:flex;
         justify-content: space-around;
      }
      @media(min-width:325px){
         .hand{
            justify-content: space-between;
         }
      }
      `;
      this.appendChild(style);
   }
}
customElements.define("page-error", Error);
