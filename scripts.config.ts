import { DenonConfig } from "https://deno.land/x/denon@2.4.4/mod.ts";

const config: DenonConfig = {
  watcher: {
    skip: ["*/.git/*", "logicAutoStockDB.json"],
  },
  scripts: {
    startTest: {
      cmd: "deno run test.ts",
      desc: "Run oak web-server http://localhost:8080/",
      allow: ["net", "read", "write"],
    },
    startApi: {
      cmd: "deno run api.ts",
      desc: "Run oak web-server http://localhost:8080/",
      allow: ["net", "read", "write", "run"],
    },
    startApi_prod: {
      cmd: "deno run api.ts",
      desc: "Run oak web-server http://localhost:8080/",
      allow: ["net", "read", "write", "run"],
      watch: false,
    },
    start: {
      cmd: "deno run static.ts",
      desc: "Run oak web-server http://localhost:8000/",
      allow: ["net", "read"],
    },
    start_prod: {
      cmd: "deno run static.ts",
      desc: "Run oak web-server http://localhost:8000/",
      allow: ["net", "read"],
      watch: false,
    },
  },
};

export default config;
