DROP DATABASE IF EXISTS `backstage-project`;
CREATE DATABASE `backstage-project`;
USE `backstage-project`;

-- USERS
CREATE TABLE users (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `passwordHash` VARCHAR(255) NOT NULL,
  name VARCHAR(100) NOT NULL
);

-- SERVICES
CREATE TABLE services (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `owner` VARCHAR(100),
  `status` ENUM('available', 'degraded', 'maintenance') DEFAULT 'available',
  `repo_url` VARCHAR(255),
  `docs_slug` VARCHAR(255),
  `user_id` INT,
  `created_at` TIMESTAMP DEFAULT NOW(),
  `updated_at` TIMESTAMP DEFAULT NOW() ON UPDATE NOW()
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`)
);

-- DOCS
CREATE TABLE docs (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `slug` VARCHAR(100) NOT NULL UNIQUE,
  `title` VARCHAR(255) NOT NULL,
  `content` TEXT NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT NOW() ON UPDATE NOW()
);

-- USERS
INSERT INTO `users` (`email`, `passwordHash`, `name`) VALUES
('dev@spotify.com', '$2b$10$3YXAyTZ93jDzv9m61X1Hke0hAZqIv.QQ4xEi2p1MZAKHdMKhXHP3G', 'Spotify Dev'), -- test123
('alice@company.com', '$2b$10$3YXAyTZ93jDzv9m61X1Hke0hAZqIv.QQ4xEi2p1MZAKHdMKhXHP3G', 'Alice Doe'),
('bob@company.com', '$2b$10$3YXAyTZ93jDzv9m61X1Hke0hAZqIv.QQ4xEi2p1MZAKHdMKhXHP3G', 'Bob Smith');

-- SERVICES
INSERT INTO `services` (`name`, `owner`, `status`, `repo_url`, `docs_slug`, `user_id`) VALUES
('Auth Service', 'Alice Doe', 'available', 'https://github.com/company/auth-service', 'auth-docs', 2),
('Payments API', 'Bob Smith', 'degraded', 'https://github.com/company/payments-api', 'payments-docs', 3),
('Notification Center', 'Spotify Dev', 'available', 'https://github.com/company/notif-center', 'notif-docs', 1),
('Analytics Engine', 'Spotify Dev', 'maintenance', 'https://github.com/company/analytics-engine', 'analytics-docs', 1);

-- DOCS
INSERT INTO `docs` (`slug`, `title`, `content`) VALUES
('auth-docs', 'Auth Service Docs', '# Auth Service\nHandles login, registration, and token issuance.'),
('payments-docs', 'Payments API Docs', '# Payments API\nManages payment transactions and invoicing.'),
('notif-docs', 'Notification Center Docs', '# Notification Center\nSends email and push notifications.'),
('analytics-docs', 'Analytics Engine Docs', '# Analytics Engine\nProcesses usage metrics and reporting.');
