import { state } from "../../state";
import { Router } from "@vaadin/router";
const hands = ["tijera", "piedra", "papel"];
class Result extends HTMLElement {
   async connectedCallback() {
      await state.subscribe(async () => {
         await this.render();
      });
      await this.render();
   }
   async render() {
      const cs = await state.getState();
      this.innerHTML = `
        <h1> ${cs.gameState.name} vs ${cs.gameState.opponentName}</h1>
      `;

      const ganador = state.whoWins(
         cs.gameState.youSelect,
         cs.gameState.opponentSelect
      );

      this.classList.add("contenedor");
      // state.saveHistory(
      //    currentState.currentGame.myPlay,
      //    currentState.currentGame.computerPlay
      // );

      this.innerHTML = `
      <custom-jugada jugada="${ganador}"></custom-jugada>
      <custom-score ganador="${ganador}"></custom-score>
      <custom-boton class="btn" title="Volver a jugar"></custom-boton>
      `;
      const style = document.createElement("style");
      style.innerHTML = `
      body{
         opacity:1 !important;
      }

      .contenedor{
         display:flex;
         flex-direction:column;
         text-align:center;
         justify-content: space-between;
         height: 100vh;
         margin:0 auto;
         margin-bottom: 0;
      }
      @media(min-width:400px){
         .contenedor{
            display:flex;
            flex-direction:column;
            width:300px;
            height: 93vh;
         }
      }
      `;
      this.appendChild(style);

      if (ganador === "empate") {
         document.body.style.backgroundColor = "#4AC0FF";
         document.body.style.backgroundImage = "none";
      } else if (state.nameTemp && ganador === "true") {
         document.body.style.backgroundColor = "#888949";
         document.body.style.backgroundImage = "none";
      } else if (!state.nameTemp && ganador === "false") {
         document.body.style.backgroundColor = "#888949";
         document.body.style.backgroundImage = "none";
      } else {
         document.body.style.backgroundColor = "#894949";
         document.body.style.backgroundImage = "none";
      }
      const btn = this.querySelector(".btn") as HTMLButtonElement;
      btn.addEventListener("click", async () => {
         Router.go("/instruction");
      });
   }
}

customElements.define("page-result", Result);
