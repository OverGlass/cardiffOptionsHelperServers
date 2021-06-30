import { Application, Router } from "./deps.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";
import asyncLogicAutoStock from "./asyncLogicAutoStock.ts";
import {
  $cardiffFormatter,
  $getLogicAutobySearch,
  $getLogicAutoTextsbyRef,
} from "./apiMiddleware.ts";

try {
  await asyncLogicAutoStock();
} catch (e) {
  console.log(e);
}

async function launchServer () {
  const api = new Application();
  const controller = new AbortController();
  const { signal } = controller;
  const router = new Router();

  api.addEventListener("error", async (evt) => {
    // Will log the thrown error to the console.
    console.log("Event Error : \n", evt.error);
    controller.abort();
    await launchServer();
  });

  router
    .post("/api/cardiffFormat", $cardiffFormatter)
    .post("/api/getLogicAutoTextsByRef", $getLogicAutoTextsbyRef)
    .post("/api/getLogicAutobySearch", $getLogicAutobySearch);

  api.use(oakCors());
  api.use(router.routes());
  api.use(router.allowedMethods());
  console.log("\nStart API on 8080");
  await api.listen({ port: 8080, signal })
  controller.abort()
  await launchServer()
}


  try {
    launchServer()
  } catch (e) {
    console.log("\nListener Error :\n -> ", e);
  }
