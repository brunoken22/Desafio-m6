import { state } from "../../state";

customElements.define(
   "custom-score",
   class extends HTMLElement {
      constructor() {
         super();
         this.render();
      }
      render() {
         const shadow = this.attachShadow({ mode: "open" });
         const div = document.createElement("div");
         div.classList.add("score");

         const userScore = state.getHistory().user;
         const computerScore = state.getHistory().computer;

         div.innerHTML = `
               <h3>Score</h3>
               <div class="puntos">
                  <h4>Vos : ${userScore}</h4>
                  <h4>Máquina : ${computerScore}</h4>
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

         shadow.appendChild(div);
         shadow.appendChild(style);
      }
   }
);
