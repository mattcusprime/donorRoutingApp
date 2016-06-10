
/*
 * Editor client script for DB table AddressesWithItems
 * Created by http://editor.datatables.net/generator
 */
var editor; // use a global for the submit and return data rendering in the examples
var myItems = {};
var myItemsd = {};
(function ($) {

    $(document).ready(function () {
        $.get('data/DayRouteDetail.txt', function (sampleData) { }).done(function (sampleData) {
            sampleData = JSON.parse(sampleData);
            myItemsd = sampleData.d;
            //paired down to 8 values to get just waypoints

            //myItemsd = myItemsd.slice(0, 7);
            //paired down to 8 values to get just waypoints
            for (var i = 0; i < myItemsd.length; i++) {
                var strDropOff = '';
                for (var j = 0; j < myItemsd[i].PickUpItem.length; j++) {
                    strDropOff += myItemsd[i].PickUpItem[j].DonateItem + '\n';

                };
                myItemsd[i].item_being_dropped_off = strDropOff;
                //myItemsd[i].State = myItemsd[i].state;
                if (typeof (myItemsd[i].state) == 'undefined') {
                    myItemsd[i].state = 'NC';
                };
            };
            for (var i = 0; i < sampleData.d.length; i++) {
                var objSourceData = sampleData.d[i];
                var objParsedData = {};
                objParsedData.DT_RowId = i;
                objParsedData.city = objSourceData.City;
                objParsedData.first_name = objSourceData.FirstName;
                //objParsedData.item_being_dropped_off = objSourceData.
                var strItemsString = '';
                for(var j = 0;j < objSourceData.PickUpItem.length;j++){
                    strItemsString += objSourceData.PickUpItem[j] + '/n';
                };
                objParsedData.item_being_dropped_off = strItemsString;
                
                objParsedData.last_name = objSourceData.LastName;
                objParsedData.state = objSourceData.State;
                objParsedData.street = objSourceData.Address1;
                objParsedData.zip_code = objSourceData.Zip;
                //myItems[i];
                
                
                //objParsedData.
                //objParsedData.
                //objParsedData.
            };
            //if (localStorage.getItem('myItems')) {
            //    myItems = JSON.parse(localStorage.getItem('myItems'));
                
            //};
            myItems = myItemsd;
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
                            myItemsd[id] = value;
                            output.data.push(value);

                        });
                    }
                    else if (d.action === 'edit') {
                        // Update each edited item with the data submitted
                        $.each(d.data, function (id, value) {
                            value.DT_RowId = id;
                            $.extend(myItemsd[id], value);
                            output.data.push(myItemsd[id]);
                        });
                    }
                    else if (d.action === 'remove') {
                        // Remove items from the object
                        $.each(d.data, function (id) {
                            delete myItemsd[id];
                        });

                    };
                    // Store the latest `todo` object for next reload
                    //localStorage.setItem('myItems', JSON.stringify(myItems));
                    localStorage.setItem('myItems', JSON.stringify(myItemsd));
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
                        "label": "Lat",
                        "name": "Lat"
                    },
                    {
                        "label": "Lng",
                        "name": "Lng"
                    }
                ]
            });

            var table = $('#AddressesWithItems').DataTable({
                dom: 'frtip',
                //ajax: 'php/table.AddressesWithItems.php',
                data: $.map(myItemsd, function (value, key) {
                    value.date = '6//10//2016';
                    value.sorting_id = '';
                    return value;
                }),
                columns: [
                    {
                        "data": "FirstName"
                    },
                    {
                        "data": "LastName"
                    },
                    {
                        "data": "date"
                    },
                    {
                        "data": "item_being_dropped_off"
                    },
                    {
                        "data": "Address1"
                    },
                    {
                        "data": "City"
                    },
                    {
                        "data": "state"
                    },
                    {
                        "data": "Zip"
                    },
                    {
                        "data": "Lat"
                    },
                    {
                        "data": "Lng"
                    }
                ],
                "columnDefs": [
            {
                "targets": [ 8 ],
                "visible": false,
                "searchable": false
            },
            {
                "targets": [ 9 ],
                "visible": false
                ,
                "searchable": false
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
});
}(jQuery));

