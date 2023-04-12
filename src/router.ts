import { Router } from "@vaadin/router";

const router = new Router(document.querySelector("#root"));
router.setRoutes([
   { path: "/", component: "page-welcome" },
   { path: "/welcome", component: "page-welcome" },
   { path: "/codigoSala", component: "page-codigo-sala" },
   { path: "/conectSala", component: "page-connect-sala" },
   { path: "/generSala", component: "page-gene-sala" },
   { path: "/instruction", component: "page-instruction" },
   { path: "/play", component: "page-play" },
   { path: "/result", component: "page-result" },
   // { path: "/instruction2", component: "page-instructionn" },
]);
