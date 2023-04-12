import { state } from "../../state";
const perdistes = require("../../img/perdiste.png");
const ganastes = require("../../img/ganastes.png");
customElements.define(
   "custom-jugada",
   class extends HTMLElement {
      connectedCallback() {
         this.render();
      }
      render() {
         const shadow = this.attachShadow({ mode: "open" });
         const div = document.createElement("div");
         const jugada = this.getAttribute("jugada");
         div.classList.add("imagen");

         function eleccion() {
            if (jugada === "empate") {
               return "Empate";
            } else if (state.nameTemp && jugada === "true") {
               return "Ganastes";
            } else if (!state.nameTemp && jugada === "false") {
               return "Ganastes";
            } else {
               return "Perdistes";
            }
         }

         const ganadorFinal = eleccion();
         div.innerHTML = `
               <h2 class="titulo titulo-${ganadorFinal}">${ganadorFinal}</h2>
               <img src="${
                  ganadorFinal === "Ganastes" ? ganastes : perdistes
               }" class="${eleccion()} estrella"/>
            `;

         const style = document.createElement("style");

         style.innerHTML = `
               .titulo{
                  color: #fff;
                  font-size: 2.8rem;
                  position: absolute;
                  top: 36px;
                  right: auto;
               }
               .estrella{
                  width:200px
               }
               @media(min-width:400px){
                  img{
                  }
               }
               .imagen{
                  display: flex;
                  align-items: center;
                  justify-content: center;
               }
               .titulo-Empate{
                  color:#000;
                  opacity:100%
               }
               .Empate{
                  opacity:30%;
               }  
            `;

         shadow.appendChild(style);
         shadow.appendChild(div);
      }
   }
);
