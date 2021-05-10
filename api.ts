import { Application, Router } from "./deps.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";
import asyncLogicAutoStock from "./asyncLogicAutoStock.ts";
import { $cardiffFormatter, $getLogicAutoTextsbyRef, $getLogicAutobySearch } from "./apiMiddleware.ts";

try {
  await asyncLogicAutoStock();
} catch (e) {
  console.log(e);
}

const api = new Application();
const controller = new AbortController();
const { signal } = controller;
const router = new Router();

api.addEventListener("error", evt => {
  // Will log the thrown error to the console.
  console.log("Event Error : \n", evt.error);
});

router
  .post("/api/cardiffFormat", $cardiffFormatter)
  .post("/api/getLogicAutoTextsByRef", $getLogicAutoTextsbyRef)
  .post("/api/getLogicAutobySearch", $getLogicAutobySearch);

api.use(oakCors());
api.use(router.routes());
api.use(router.allowedMethods());

while (true) {
  try {
    await api.listen({ port: 8080, signal });
  } catch (e) {
    console.log("Listener Error :\n", e);
    controller.abort();
  }
}
