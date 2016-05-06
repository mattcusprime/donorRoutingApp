-- 
-- Editor SQL for DB table AddressesWithItems
-- Created by http://editor.datatables.net/generator
-- 

CREATE TABLE IF NOT EXISTS `AddressesWithItems` (
	`id` int(10) NOT NULL auto_increment,
	`first_name` varchar(255),
	`last_name` varchar(255),
	`item_being_dropped_off` varchar(255),
	`street` varchar(255),
	`city` varchar(255),
	`state` varchar(255),
	`zip_code` numeric(9,2),
	`sorting_id` varchar(255),
	PRIMARY KEY( `id` )
);