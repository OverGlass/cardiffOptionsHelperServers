import { send, Context } from "./deps.ts";

export default async function (context: Context) {
  await send(context, context.request.url.pathname, {
    root: `${Deno.cwd()}/../webUI/`,
    index: "index.html",
  });
}
