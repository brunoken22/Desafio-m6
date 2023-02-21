class Hand extends HTMLElement {
   constructor() {
      super();
      this.render();
   }
   render() {
      const shadow = this.attachShadow({ mode: "open" });
      const div = document.createElement("div");
      const style = document.createElement("style");
      const valor = this.getAttribute("direction");
      const clase = this.getAttribute("class");

      div.innerHTML = `
            <img src="${valor}" class="${clase}" alt="hands">
         `;

      style.innerHTML = `
      
         `;

      shadow.appendChild(div);
      shadow.appendChild(style);
   }
}
customElements.define("custom-hand", Hand);
