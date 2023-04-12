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
         const name = (this.querySelector(".input") as HTMLInputElement).value;
         state.nameTemp = name;
         document.body.style.opacity = "0.5 ";
         await state.setName(name);
         await state.askNewRoom();
         await state.pushEstate(() => {});
         Router.go("/generSala");
      });
   }
   render() {
      const style = document.createElement("style");
      this.classList.add("contenedor");
      document.body.style.backgroundImage = `url(${fondo})`;
      document.body.style.backgroundColor = `inherit`;
      this.innerHTML = `
      <custom-title inicio="${"Piedra<br> Papel <span class='span-o'>o</span> Tijera"}"></custom-title>
         <div>
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
      @media(min-width:400px){
         .contenedor{
            display:flex;
            flex-direction:column;
            width:300px;
            height: 93vh;
            margin:0 auto;
         }
      }
      .label{
         text-align:start;
         font-size:2rem;
      }
      .input{
         background-color:transparent;
         text-indent:10px;
         font-family: 'Odibee Sans', cursive;
         font-size:2.2rem;
         max-width:300px;
         height:80px;
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
customElements.define("page-codigo-sala", CodigoSala);
