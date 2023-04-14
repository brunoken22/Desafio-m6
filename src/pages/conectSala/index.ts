const papel = require("../../img/papel.png");
const tijera = require("../../img/tijera.png");
const piedra = require("../../img/piedra.png");
import { Router } from "@vaadin/router";
import { state } from "../../state";
import { log } from "console";
export class ConnectSala extends HTMLElement {
   async connectedCallback() {
      await this.render();

      const btn = this.querySelector(".btn");
      btn?.addEventListener("click", async (e) => {
         const name = (this.querySelector(".name") as HTMLInputElement).value;
         const idtem = (this.querySelector(".id") as HTMLInputElement).value;

         if (name.length <= 3 || idtem.length <= 5) {
            const error = this.querySelector(".error") as HTMLInputElement;
            error.style.display = "block";
            const botonError = this.querySelector(
               ".boton-error"
            ) as HTMLInputElement;
            botonError.addEventListener("click", (e) => {
               e.preventDefault();
               error.style.display = "none";
            });
            return false;
         }
         this.style.opacity = "0.2";

         (document.querySelector(".load") as HTMLDivElement).style.display =
            "flex";

         const id = this.querySelector(".id") as HTMLInputElement;
         await state.obtenerGameState(id.value);
         const cs = await state.getState();
         const nameopo = this.querySelector(".name") as HTMLInputElement;
         cs.gameState.rtdb = id.value;
         cs.gameState.opponentName = nameopo.value;
         cs.gameState.opponentConect = true;

         const validacion = (await state.validarRtdb()) as any;

         if (validacion) {
            console.log("generasala");

            Router.go("/generSala");
         } else {
            console.log("render");

            this.style.opacity = "1";

            (document.querySelector(".load") as HTMLDivElement).style.display =
               "none";
            (
               document.querySelector(".rtdb-noexist") as HTMLDivElement
            ).style.display = "flex";
            (this.querySelector(".id") as HTMLInputElement).style.borderColor =
               "rgba(230, 91, 91, 0.8)";
            (this.querySelector(".id") as HTMLInputElement).value = "";
            (this.querySelector(".name") as HTMLInputElement).value = "";
            setTimeout(() => {
               (
                  document.querySelector(".rtdb-noexist") as HTMLDivElement
               ).style.display = "none";
            }, 10000);
         }
      });
   }
   async render() {
      const style = document.createElement("style");
      this.classList.add("contenedor");
      this.innerHTML = `
      <custom-title inicio="${"Piedra<br> Papel <span class='span-o'>o</span> Tijera"}"></custom-title>
      <form class="idopo">
         <input type="text" class="id input" placeholder="Ingrese el ID">
         <input type="text" class="name input" placeholder="Tu nombre ..." required>
         <custom-boton id="roomExist" class="btn" title="Ingresar"></custom-boton>
         <div class="error" style="display:none">
         <svg xmlns="http://www.w3.org/100/svg" style="display: none;">
         <symbol id="exclamation-triangle-fill" viewBox="0 0 16 14">
         <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"></path>
         </symbol>
         </svg>
      
         <div class="alert" role="alert" >
            <svg class="" style="width:40px"role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"></use></svg>
            <div>
               Minimo 3 caracteres
            </div>
            <div class="conte-error"><a href="#" class="boton-error"></a></div>
         </div>
      </div>
      </form>
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
      @media(min-width:325px){
         .contenedor{
            display:flex;
            flex-direction:column;
            width:300px;
            margin:0px auto;
            margin-bottom: 0;
            height: 100vh;

         }
      }
      .idopo{
         margin:0 10px;
      }
      .input{
         background-color:transparent;
         text-indent:10px;
         font-family: 'Odibee Sans', cursive;
         font-size:2rem;
         width:100%;
         height:60px;
         border: 5px solid #001997;
         border-radius:10px;
         margin-bottom:10px;
      }
      @media(min-width:325px){
         .input{
            width:100%;
         }
      }
      .alert{
         display: flex;
         height: 50px;
         align-items: center;
         justify-content: center;
         background-color:rgba(109, 221, 0, 0.5);;
         border-radius:10px;
         padding:20px;
         font-size:1.3rem;
         column-gap:10px;

      }
      .boton-error:before{
         content:"x";
         font-size:1.5rem;
         font-family:"Roboto"
      }
      .boton-error{
         color:white;
         text-decoration:none;
         margin-left:30px;
      }
      .hand{
         display:flex;
         justify-content: space-around;
      }
      @media(min-width:325px){
         .hand{
            justify-content: space-between;
         }
      }
      `;

      this.appendChild(style);
   }
}
customElements.define("page-connect-sala", ConnectSala);
