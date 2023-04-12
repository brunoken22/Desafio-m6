class Boton extends HTMLElement {
   constructor() {
      super();
      this.render();
   }
   render() {
      const shadow = this.attachShadow({ mode: "open" });
      const div = document.createElement("div");
      const title = this.getAttribute("title") as any;

      div.innerHTML = `
            <button class="btn ${
               title?.length > 11 ? "true" : ""
            }">${title}</button>
         `;
      const style = document.createElement("style");
      style.innerHTML = `
            .btn{
               font-family: 'Odibee Sans', cursive;
               font-size:3rem;
               width:322px;
               height:87px;
               color:#fff;
               background-color:#006CFC;
               border: 10px solid #001997;
               border-radius:10px;
               margin-bottom:10px;
            }
            @media(min-width:400px){
               .btn{
                  width:100%;
                  cursor:pointer;
               }
            }
            .true{
               height:120px;
            }
         `;
      shadow.appendChild(div);
      shadow.appendChild(style);
   }
}
customElements.define("custom-boton", Boton);
