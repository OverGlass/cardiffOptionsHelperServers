import { Application } from "./deps.ts";
import staticServerMiddlware from "./staticServerMiddleware.ts";

const app = new Application();
const controller = new AbortController();
const { signal } = controller;

app.use(staticServerMiddlware);

while (true) {
  try {
    await app.listen({ port: 8000, signal });
  } catch (e) {
    console.log(e);
    controller.abort();
  }
}
