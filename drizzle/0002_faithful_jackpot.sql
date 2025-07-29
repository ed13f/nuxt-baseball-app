CREATE TABLE `players_to_teams` (
	`player_id` integer NOT NULL,
	`team_id` integer NOT NULL,
	`created_at` integer NOT NULL,
	`updatedAt` integer NOT NULL,
	FOREIGN KEY (`player_id`) REFERENCES `players`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`team_id`) REFERENCES `teams`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users_to_teams` (
	`user_id` integer NOT NULL,
	`team_id` integer NOT NULL,
	`created_at` integer NOT NULL,
	`updatedAt` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`team_id`) REFERENCES `teams`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
ALTER TABLE `players` ADD `email` text NOT NULL;--> statement-breakpoint
ALTER TABLE `players` ADD `height` integer NOT NULL;--> statement-breakpoint
ALTER TABLE `players` ADD `weight` integer NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX `players_email_unique` ON `players` (`email`);