CREATE TABLE `template_data` (
	`id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
	`name` char(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
	`author` char(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
	`create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	`data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
	`deleted` tinyint(1) NOT NULL DEFAULT 0,
	`display` tinyint(1) NOT NULL DEFAULT 0,
	PRIMARY KEY (`id`),
	KEY `id_idx`(`id`) USING BTREE
) ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8mb4 COLLATE=utf8mb4_general_ci
AUTO_INCREMENT=23
ROW_FORMAT=DYNAMIC
AVG_ROW_LENGTH=2730;
