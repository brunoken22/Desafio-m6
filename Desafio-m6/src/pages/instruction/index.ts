const papel = require("../../img/papel.png");
const tijera = require("../../img/tijera.png");
const piedra = require("../../img/piedra.png");
const fondo = require("../../img/fondo.png");
import { Router } from "@vaadin/router";

class Instruction extends HTMLElement {
   connectedCallback() {
      this.render();
   }
   render() {
      const div = document.createElement("div");
      const style = document.createElement("style");
      div.classList.add("contenedor");
      document.body.style.backgroundImage = `url(${fondo})`;
      document.body.style.backgroundColor = `inherit`;
      //"Presioná jugar y elegí: piedra, papel o tijera antes de que pasen los 5 segundos.
      div.innerHTML = `
      <div class="detalles">
         <div>
            <p>Bruno:0</p>
            <p>Allison:0</p>
         </div>
         <div>
            <p>Sala</p>
            <p>15dsa6</p>
         </div>
      </div>
      <div class="instruction">
         <custom-title inicio="Presioná jugar y elegí: piedra, papel o tijera antes de que pasen los 3 segundos."></custom-title>
         <custom-boton class="btn" title="¡Jugar!"></custom-boton>
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
      this.appendChild(div);
      const btn = div.querySelector(".btn");
      btn?.addEventListener("click", () => {
         Router.go("/play");
      });
   }
}
customElements.define("page-instruction", Instruction);
