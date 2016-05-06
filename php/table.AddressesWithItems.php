<?php

/*
 * Editor server script for DB table AddressesWithItems
 * Created by http://editor.datatables.net/generator
 */

// DataTables PHP library and database connection
include( "lib/DataTables.php" );

// Alias Editor classes so they are easy to use
use
	DataTables\Editor,
	DataTables\Editor\Field,
	DataTables\Editor\Format,
	DataTables\Editor\Mjoin,
	DataTables\Editor\Upload,
	DataTables\Editor\Validate;

// The following statement can be removed after the first run (i.e. the database
// table has been created). It is a good idea to do this to help improve
// performance.
$db->sql( "CREATE TABLE IF NOT EXISTS `AddressesWithItems` (
	`id` int(10) NOT NULL auto_increment,
	`first_name` varchar(255),
	`last_name` varchar(255),
	`item_being_dropped_off` varchar(255),
	`street` varchar(255),
	`city` varchar(255),
	`state` varchar(255),
	`zip_code` numeric(5,0),
	`sorting_id` varchar(255),
	PRIMARY KEY( `id` )
);" );

// Build our Editor instance and process the data coming from _POST
Editor::inst( $db, 'AddressesWithItems', 'id' )
	->fields(
		Field::inst( 'first_name' ),
		Field::inst( 'last_name' ),
		Field::inst( 'item_being_dropped_off' ),
		Field::inst( 'street' ),
		Field::inst( 'city' ),
		Field::inst( 'state' ),
		Field::inst( 'zip_code' ),
		Field::inst( 'sorting_id' )
	)
	->process( $_POST )
	->json();
