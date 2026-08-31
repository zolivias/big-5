CREATE TABLE `user_profiles` (
	`user_id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`profile_json` text NOT NULL,
	`updated_at` integer NOT NULL
);
