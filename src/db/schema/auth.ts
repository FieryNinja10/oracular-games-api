import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import { db } from "@db/index";

import {
  pgTable,
  text,
  timestamp,
  boolean,
  pgEnum,
  primaryKey,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  username: text("name").default("Player"),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  birthday: timestamp("birthday", { mode: "date" }).notNull(),
  newsletter: boolean("newsletter"),
  createdAt: timestamp("createdAt", { mode: "date" }).default(sql`now()`),
  updatedAt: timestamp("updatedAt", { mode: "date" }).default(sql`now()`),
});

export const friendStatus = pgEnum("friendStatus", ["pending", "accepted"]);

export const friends = pgTable(
  "friend",
  {
    profileId: text("profileId")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    friendId: text("friendId").notNull(),
    status: friendStatus("friendStatus").notNull().default("pending"),
    createdAt: timestamp("createdAt", { mode: "date" }).default(sql`now()`),
    updatedAt: timestamp("updatedAt", { mode: "date" }).default(sql`now()`),
  },
  (friend) => ({
    compoundKey: primaryKey(friend.profileId, friend.friendId),
  }),
);

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

export const adapter = new DrizzlePostgreSQLAdapter(db, session, user);
