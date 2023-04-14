import { state } from "../../state";

customElements.define(
   "custom-score",
   class extends HTMLElement {
      async connectedCallback() {
         await this.render();
      }
      async render() {
         const cs = await state.getState();

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
                  width:100%;
                  border:solid 10px;
                  border-radius:20px;
                  background-color:#fff;
                  margin:auto 5px;
                  padding:10px
               }
               @media(min-width:400px){
                  .score{
                     margin:auto 0;
                     padding:20px;

                  }
               }
               .score h3{
                  text-align:center;
                  margin-top:0;
                  margin-bottom:0;
                  font-size:2.5rem;

               }
               @media(min-width:400px){
                  .score h3{
                     font-size:3.5rem;
            

                  }
               }
               .puntos{

               }
               .puntos h4{
                  font-size:1.8rem;
                  text-align:end;
                  margin-bottom:0;
                  margin-top:30px
               }
               @media(min-width:400px){
                  font-size:2.5rem;
                
               }
            `;

         this.appendChild(style);
      }
   }
);
