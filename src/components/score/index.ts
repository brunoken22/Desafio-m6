import { state } from "../../state";

customElements.define(
   "custom-score",
   class extends HTMLElement {
      constructor() {
         super();
         this.render();
      }
      async render() {
         const ganador = this.getAttribute("ganador") as any;
         const cs = await state.getState();
         if (ganador == "empate") {
            let count = 0;
         } else if (ganador === "true") {
            let count = 0;
            cs.score.you = count + 1;
            await state.pushEstate();
         } else if (ganador === "false") {
            let count = 0;
            cs.score.oponent = count + 1;
            await state.pushEstate();
         }

         this.classList.add("score");

         this.innerHTML = `
               <h3>Score</h3>
               <div class="puntos">
                  <h4>${cs.gameState.name} ${
            cs.gameState.name ? ": " + cs.score.you : ""
         }</h4>
                     <h4>${cs.gameState.opponentName} ${
            cs.gameState.opponentName ? ": " + cs.score.oponent : ""
         }</h4>
               </div>
            `;

         const style = document.createElement("style");
         style.innerHTML = `
               .score{
                  width:inherit;
                  margin:15px auto;
                  border:solid 10px;
                  border-radius:20px;
                  padding:20px;
                  background-color:#fff;
               }

               .score h3{
                  text-align:center;
                  font-size:3.5rem;
                  margin-top:0;
                  margin-bottom:0;
               }
               .puntos{

               }
               .puntos h4{
                  text-align:end;
                  font-size:2.5rem;
                  margin-bottom:0;
                  margin-top:30px
               }
            `;

         this.appendChild(style);
      }
   }
);
