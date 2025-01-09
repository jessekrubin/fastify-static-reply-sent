// fastify

import path from "node:path";
import Fastify from "fastify";

import FastifyStatic from "@fastify/static";
const fastify = Fastify({ logger: { level: "trace" } });

const pwd = process.cwd();
const root = path.join(pwd, "/node_modules");
console.log(root);
fastify
  .register(FastifyStatic, {
    // An absolute path containing static files to serve.
    root,
    redirect: true,
    // wildcard: true,
    prefix: "/node_modules",
    index: false,
    // Do not append a trailing slash to prefixes.
    // prefixAvoidTrailingSlash: true,
    // Return a directory listing with a handlebar template.
    list: true,
  })
  .listen({ port: 3000 }, (err) => {
    if (err) throw err;
  });

// NO PROBLEMO:
//   http://localhost:3000/node_modules/@fastify   <-- no trailing slash
// HAS PROBLEM:
//   http://localhost:3000/node_modules/           <-- trailing slash
//   http://localhost:3000/node_modules/@fastify/  <-- trailing slash
