import { relations, sql } from "drizzle-orm";
import {
  timestamp,
  pgTableCreator,
  serial,
  varchar,
  index,
} from "drizzle-orm/pg-core";
import { users } from "./users";

const pgTable = pgTableCreator((name) => `chirp_${name}`);

export const posts = pgTable(
  "posts",
  {
    id: serial("id").primaryKey(),
    content: varchar("content", { length: 256 }),
    authorId: varchar("author_id", { length: 255 })
      .notNull()
      .references(() => users.id),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (example) => ({
    authorIdIndex: index("authorId_idx").on(example.authorId),
  }),
);

export const postsRelactions = relations(posts, ({ one }) => ({
  user: one(users, { fields: [posts.authorId], references: [users.id] }),
}));
