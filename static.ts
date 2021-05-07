import { Application } from "./deps.ts";
import staticServerMiddlware from "./staticServerMiddleware.ts";

const app = new Application();

app.use(staticServerMiddlware);

while (true) {
  try {
    await app.listen({ port: 8000 });
  } catch (e) {
    console.log(e);
  }
}
