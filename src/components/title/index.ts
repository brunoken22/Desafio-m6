class Title extends HTMLElement {
   constructor() {
      super();
      this.render();
   }
   render() {
      const shadow = this.attachShadow({ mode: "open" });
      const instruction = this.getAttribute("inicio")!;
      const div = document.createElement("div");
      const style = document.createElement("style");

      div.innerHTML = `
         <h2 class=${
            instruction.length > 53 ? "instruction" : "titulo"
         } >${instruction}</h2>
         `;

      style.innerHTML = `
            .titulo{
               font-size:3.5rem;
               color: #009048;
               margin-bottom:0;
               margin-top:40px;
            }
            .instruction{
               padding:0 10px;
               font-size:2.6rem;
            }
            .span-o{
               opacity:50%;
            }
         `;
      shadow.appendChild(div);
      shadow.appendChild(style);
   }
}

customElements.define("custom-title", Title);
