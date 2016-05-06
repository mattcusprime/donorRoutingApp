
/*
 * Editor client script for DB table AddressesWithItems
 * Created by http://editor.datatables.net/generator
 */

(function($){

$(document).ready(function() {
	var editor = new $.fn.dataTable.Editor( {
		ajax: 'php/table.AddressesWithItems.php',
		table: '#AddressesWithItems',
		fields: [
			{
				"label": "First name",
				"name": "first_name"
			},
			{
				"label": "Last name",
				"name": "last_name"
			},
			{
				"label": "Item Being Dropped Off",
				"name": "item_being_dropped_off"
			},
			{
				"label": "Street",
				"name": "street"
			},
			{
				"label": "City",
				"name": "city"
			},
			{
				"label": "State",
				"name": "state"
			},
			{
				"label": "Zip Code",
				"name": "zip_code"
			},
			{
				"label": "Sorting Id",
				"name": "sorting_id",
				"type": "hidden"
			}
		]
	} );

	var table = $('#AddressesWithItems').DataTable( {
		dom: 'Bfrtip',
		ajax: 'php/table.AddressesWithItems.php',
		columns: [
			{
				"data": "first_name"
			},
			{
				"data": "last_name"
			},
			{
				"data": "item_being_dropped_off"
			},
			{
				"data": "street"
			},
			{
				"data": "city"
			},
			{
				"data": "state"
			},
			{
				"data": "zip_code"
			},
			{
				"data": "sorting_id"
			}
		],
		select: true,
		lengthChange: false,
		buttons: [
			{ extend: 'create', editor: editor },
			{ extend: 'edit',   editor: editor },
			{ extend: 'remove', editor: editor }
		]
	} );
} );

}(jQuery));

