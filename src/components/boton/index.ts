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
               font-size:2.3rem;
               height:70px;
               color:#fff;
               background-color:#006CFC;
               border: 10px solid #001997;
               border-radius:10px;
               cursor:pointer;

               width:100%;
              
            }
            .true{
               height:100px;
            }
            @media(min-width:400px){
               .true{
                  height:85px;
               }
               .btn{
                  margin-right:0 ;
                  margin-left:0;
                  margin-bottom:10px;
                  width:100%;
               }
            }
         `;
      shadow.appendChild(div);
      shadow.appendChild(style);
   }
}
customElements.define("custom-boton", Boton);
