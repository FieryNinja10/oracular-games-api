import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import { env } from "src/env";
import { adapter as luciaAdapter } from "@db/schema/auth";

const pool = new Pool({
  connectionString: env.PG_URL,
});

export const db: NodePgDatabase = drizzle(pool);

export const adapter = luciaAdapter;
