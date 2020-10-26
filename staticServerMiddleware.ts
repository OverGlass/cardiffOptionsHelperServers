import { send, Context } from "./deps.ts";
import { config } from "https://deno.land/x/dotenv@v0.5.0/mod.ts";

const env = config();

export default async function (context: Context) {
  await send(context, context.request.url.pathname, {
    root: env.CLIENT_PATH,
    index: "index.html",
  });
}
