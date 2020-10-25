import { Application } from "./deps.ts";
import staticServerMiddlware from "./staticServerMiddleware.ts";

const app = new Application();

app.use(staticServerMiddlware);

await app.listen({ port: 8000 });
