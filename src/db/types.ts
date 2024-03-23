import { createInsertSchema } from "drizzle-zod";
import { user } from "@db/schema/auth";

export const userRegisterSchema = createInsertSchema(user);
