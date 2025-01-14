CREATE TABLE `subscriptions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`info` json NOT NULL,
	CONSTRAINT `subscriptions_id` PRIMARY KEY(`id`)
);
