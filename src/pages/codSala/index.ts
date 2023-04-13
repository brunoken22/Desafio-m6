const papel = require("../../img/papel.png");
const tijera = require("../../img/tijera.png");
const piedra = require("../../img/piedra.png");
const fondo = require("../../img/fondo.png");
import { Router } from "@vaadin/router";
import { state } from "../../state";
class CodigoSala extends HTMLElement {
   connectedCallback() {
      this.render();
      const btn = this.querySelector(".btn");
      btn?.addEventListener("click", async () => {
         this.style.opacity = "0.2";

         (document.querySelector(".load") as HTMLDivElement).style.display =
            "flex";
         const name = (this.querySelector(".input") as HTMLInputElement).value;
         state.nameTemp = name;
         await state.setName(name);
         await state.askNewRoom();
         Router.go("/generSala");
      });
   }
   render() {
      const style = document.createElement("style");
      this.classList.add("contenedor");
      this.innerHTML = `
         <custom-title inicio="${"Piedra<br> Papel <span class='span-o'>o</span> Tijera"}"></custom-title>
         <div class="name">
            <label for="name" class="label">Tu Nombre</label>
            <input type="text" class="input" id="name" placeholder="Bruno...">
            <custom-boton class="btn" title="Empezar"></custom-boton>
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
      @media(min-width:325px){
         .contenedor{
            display:flex;
            flex-direction:column;
            width:300px;
            height: 100vh;
            margin:0 auto;
         }
      }
    
   
      .name{
         margin:0 10px;
      }
      .label{
         width:100%;
         text-align:start;
         font-size:2rem;
      }
      .input{
         background-color:transparent;
         text-indent:10px;
         font-family: 'Odibee Sans', cursive;
         font-size:2rem;
         width:100%;
         height:60px;
         border: 5px solid #001997;
         border-radius:10px;
         margin-bottom:10px;
      }
      @media(min-width:325px){
         .input{
            width:100%;
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
customElements.define("page-codigo-sala", CodigoSala);
