CREATE TABLE `Notes` (
	`id` integer PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`content` text NOT NULL,
	`created_at` text DEFAULT 'CURRENT_TIMESTAMP',
	`updated_at` text DEFAULT 'CURRENT_TIMESTAMP',
	`is_starred` integer DEFAULT 0,
	`is_locked` integer DEFAULT 0,
	`is_deleted` integer DEFAULT 0
);
