import { Hono } from "hono";

const app = new Hono();

app.get("/hello", (c) => c.json({ message: "Hello, world!" }));

Bun.serve({
  fetch: app.fetch,
  port: process.env.PORT || 8080,
});
