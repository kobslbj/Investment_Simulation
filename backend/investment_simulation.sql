CREATE TABLE `users` (
  `id` int PRIMARY KEY,
  `username` varchar(255),
  `email` varchar(255),
  `password` varchar(255),
  `registration_date` datetime
);

CREATE TABLE `orders` (
  `id` int PRIMARY KEY,
  `user_id` int,
  `stock_id` int,
  `order_type` varchar(255),
  `quantity` int,
  `order_price` decimal,
  `order_date` datetime,
  `status` varchar(255)
);

CREATE TABLE `transactions` (
  `id` int PRIMARY KEY,
  `order_id` int,
  `transaction_price` decimal,
  `transaction_quantity` int,
  `transaction_date` datetime
);

CREATE TABLE `stock_holdings` (
  `id` int PRIMARY KEY,
  `user_id` int,
  `stock_id` int,
  `quantity` int,
  `average_price` decimal
);

CREATE TABLE `stocks` (
  `id` int PRIMARY KEY,
  `stock_symbol` varchar(255),
  `stock_name` varchar(255),
  `current_price` decimal
);

ALTER TABLE `orders` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `orders` ADD FOREIGN KEY (`stock_id`) REFERENCES `stocks` (`id`);

ALTER TABLE `transactions` ADD FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`);

ALTER TABLE `stock_holdings` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `stock_holdings` ADD FOREIGN KEY (`stock_id`) REFERENCES `stocks` (`id`);
