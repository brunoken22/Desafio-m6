import { state } from "../../state";
import { Router } from "@vaadin/router";
class Result extends HTMLElement {
   async connectedCallback() {
      await this.render();
      const btn = this.querySelector(".btn");
      btn?.addEventListener("click", async (e) => {
         e.preventDefault();
         console.log("hicistes click");

         const cs = await state.getState();
         if (state.nameTemp === cs.gameState.name) {
            cs.gameState.play = false;
            cs.gameState.youSelect = "";
            await state.pushEstate();
            console.log(await state.pushEstate);

            console.log("hola");
         }
         // else {
         //    cs.gameState.opponentPlay = false;
         //    cs.gameState.opponentSelect = "";
         //    await state.pushEstate();
         //    console.log("hola2");
         // }
      });
   }
   async render() {
      const cs = await state.getState();
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
      opacity:90%;
   }

   .contenedor{
      display:flex;
      flex-direction:column;
      text-align:center;
      justify-content: space-between;
      height: 100vh;
      margin:20px auto;
      margin-bottom: 0;
   }
   @media(min-width:400px){
      .contenedor{
         display:flex;
         flex-direction:column;
         width:300px;
         height: 97.5vh;
      }
   }
   `;

      const fondo = this.querySelector("custom-jugada")!.getAttribute("jugada");

      if (fondo === "empate") {
         document.body.style.backgroundColor = "#4AC0FF";
         document.body.style.backgroundImage = "none";
      } else if (fondo === "true") {
         document.body.style.backgroundColor = "#888949";
         document.body.style.backgroundImage = "none";
      } else if (fondo === "false") {
         document.body.style.backgroundColor = "#894949";
         document.body.style.backgroundImage = "none";
      }

      this.appendChild(style);
   }
}

customElements.define("page-result", Result);
