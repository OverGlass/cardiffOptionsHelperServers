import { DenonConfig } from "https://deno.land/x/denon@2.4.4/mod.ts";

const config: DenonConfig = {
  scripts: {
    startApi: {
      cmd: "deno run api.ts",
      desc: "Run oak web-server http://localhost:8080/",
      allow: ["net", "read", "write", "run"],
    },
    start: {
      cmd: "deno run static.ts",
      desc: "Run oak web-server http://localhost:8000/",
      allow: ["net", "read"],
    },
  },
};

export default config;
