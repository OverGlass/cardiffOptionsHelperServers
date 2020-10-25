import { Application, Router } from "./deps.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";
import { $cardiffFormatter, $getLogicAutoTextsbyRef } from "./apiMiddleware.ts";

const api = new Application();
const router = new Router();

api.addEventListener("error", (evt) => {
  api.use(oakCors());
  // Will log the thrown error to the console.
  console.log(evt.error);
});
router
  .post("/api/cardiffFormat", $cardiffFormatter)
  .post("/api/getLogicAutoTextsByRef", $getLogicAutoTextsbyRef);

api.use(oakCors());
api.use(router.routes());
api.use(router.allowedMethods());

await api.listen({ port: 8080 });
