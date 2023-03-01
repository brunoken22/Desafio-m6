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
         await state.setName(name);
         await state.askNewRoom();
         await state.pushEstate();
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
      <label for="name" class="label">Tu Nombre</label>
      <input type="text" class="input" id="name" placeholder="Bruno...">
      <custom-boton class="btn" title="Empezar"></custom-boton>
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
            margin:60px auto;
            margin-bottom: 0;
            height: 82vh;
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
         margin-top:2.6rem;
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
