import { Hono } from "hono";
import { env } from "./env";

const app = new Hono();

app.get("/hello", (c) => c.json({ message: env.NEXTAUTH_SECRET }));

Bun.serve({
  fetch: app.fetch,
  port: process.env.PORT || 8080,
});
