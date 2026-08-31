import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const userProfiles = sqliteTable("user_profiles", {
  userId: text("user_id").primaryKey(),
  email: text("email").notNull(),
  profileJson: text("profile_json").notNull(),
  updatedAt: integer("updated_at").notNull(),
});
