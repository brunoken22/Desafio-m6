const perdistes = require("../../img/perdiste.png");
const ganastes = require("../../img/ganastes.png");
customElements.define(
   "custom-jugada",
   class extends HTMLElement {
      constructor() {
         super();
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
            } else if (jugada === "true") {
               return "Ganastes";
            } else {
               return "Perdistes";
            }
         }
         div.innerHTML = `
               <h2 class="titulo titulo-${eleccion()}">${eleccion()}</h2>
               <img src="${
                  jugada == "true" ? ganastes : perdistes
               }" class="${eleccion()}"/>
            `;

         const style = document.createElement("style");

         style.innerHTML = `
               .titulo{
                  color: #fff;
                  font-size: 3.3rem;
                  position: absolute;
                  top: 70px;
                  right: auto;
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
