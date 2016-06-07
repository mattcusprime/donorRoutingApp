
/*
 * Editor client script for DB table AddressesWithItems
 * Created by http://editor.datatables.net/generator
 */
var editor; // use a global for the submit and return data rendering in the examples
var myItems = {};
(function ($) {

    $(document).ready(function () {
       
        if (localStorage.getItem('myItems')) {
            myItems = JSON.parse(localStorage.getItem('myItems'));
        };

        editor = new $.fn.dataTable.Editor({
            //ajax: 'php/table.AddressesWithItems.php',
            ajax: function (method, url, d, successCallback, errorCallback) {
                var output = { data: [] };
                if (d.action === 'create') {
                    $.each(d.data, function (key, value) {
                        //var id = $('#AddressesWithItems').find('tr').length;
                        var id = getDataTablesNumberOfRows('AddressesWithItems');
                        /*var strFullId = '#' + 'AddressesWithItems';
                        if ($.fn.DataTable.isDataTable(strFullId)) {
                            var numberOfRows = $(strFullId).DataTable().rows().data().length;
                            id = numberOfRows;
                        }
                        else {
                            var numberOfRows = $(strFullId).rows().data().length;
                            id = numberOfRows;
                        };*/

                        
                        value.DT_RowId = id;
                        myItems[id] = value;
                        output.data.push(value);

                    });
                }
                else if (d.action === 'edit') {
                    // Update each edited item with the data submitted
                    $.each(d.data, function (id, value) {
                        value.DT_RowId = id;
                        $.extend(myItems[id], value);
                        output.data.push(myItems[id]);
                    });
                }
                else if (d.action === 'remove') {
                    // Remove items from the object
                    $.each(d.data, function (id) {
                        delete myItems[id];
                    });

                };
                // Store the latest `todo` object for next reload
                localStorage.setItem('myItems', JSON.stringify(myItems));

                // Show Editor what has changed
                successCallback(output);


            },
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
                    "label": "Date:",
                    "name": "date",
                    "type": "datetime",
                    "format": "MM\/DD\/YY h:mm a"
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
        });

        var table = $('#AddressesWithItems').DataTable({
            dom: 'Bfrtip',
            //ajax: 'php/table.AddressesWithItems.php',
            data: $.map(myItems, function (value, key) {
                return value;
            }),
            columns: [
                {
                    "data": "first_name"
                },
                {
                    "data": "last_name"
                },
                {
                    "data": "date"
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
                { extend: 'edit', editor: editor },
                { extend: 'remove', editor: editor }
            ]
        });
    });

}(jQuery));

