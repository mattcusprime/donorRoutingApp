var funDatCbackTho = function () { alert('I GOT CALLED BACK YO') };
var urlGoogMapsUrl = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCzyiqBO_5XdhIyozK30VcFyDKZiUD_2nw&callback=initMap';
var funGeoCodeFunction;
var map;
var arrMarkerArray = [];
var arrPositions = [];
function calculateRoute() {
    var table = $('#AddressesWithItems').DataTable();
    var data = table.rows().data();
    //console.log(data);
    for (var i = 0; i < data.length; i++) {
        var objCurrentRow = data[i];
        var strCurrentAddress = objCurrentRow.street + "," + objCurrentRow.city + "," + objCurrentRow.state + "," + objCurrentRow.zip_code;
        strCurrentAddress = strCurrentAddress.replace(/\s/g, '+');
        console.log(strCurrentAddress);

    };

};

function geocodeAddress(address,geocoder,resultsMap,shouldICenterTheMap,markerArray,type) {
    //var address = document.getElementById('address').value;
    geocoder.geocode({ 'address': address }, function (results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
            if (shouldICenterTheMap) { resultsMap.setCenter(results[0].geometry.location) };
            var marker = new google.maps.Marker({
                map: resultsMap,
                position: results[0].geometry.location
            });
            markerArray.push(markerArray);
            var objPositionObject = {};
            objPositionObject.lat = Number(results[0].geometry.location.lat());
            objPositionObject.lng = Number(results[0].geometry.location.lng());
            arrPositions.push(objPositionObject);
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
   
}
function initMap() {
    //$('#map').show();
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 36, lng: -80 },
        zoom: 10
    });
    $('#zoomForm').submit(function (event) {
        event.preventDefault();
        var numNewZoom = $('#zoomVal').val();
        numNewZoom = Number(numNewZoom);
        map.setZoom(numNewZoom);
    });
    geocoder = new google.maps.Geocoder();
    funGeoCodeFunction = function () {
        var table = $('#AddressesWithItems').DataTable();
        $('#tblContainer').fadeOut();
        var tableData = table.rows().data();
        for (var i = 0; i < tableData.length; i++) {
            var objCurrentRow = tableData[i];
            var strCurrentAddress = objCurrentRow.street + "," + objCurrentRow.city + "," + objCurrentRow.state + "," + objCurrentRow.zip_code;
            if (i == tableData.length - 1) {
                geocodeAddress(strCurrentAddress, geocoder, map, true, arrMarkerArray,"final");
            }
            else if (i == 0) {
                geocodeAddress(strCurrentAddress, geocoder, map, false, arrMarkerArray,"origin");
            }
            else {
                geocodeAddress(strCurrentAddress, geocoder, map, false, arrMarkerArray,"mid");
            };
        };
        //console.log(arrMarkerArray);


    var service = new google.maps.DistanceMatrixService;
    /*service.getDistanceMatrix({
        origins: [arrPositions],
        destinations: [arrPositions],
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC,
        avoidHighways: false,
        avoidTolls: false
    }, function(response, status) {
        if (status !== google.maps.DistanceMatrixStatus.OK) {
            alert('Error was: ' + status);
        } else {
            var originList = response.originAddresses;
            var destinationList = response.destinationAddresses;
            var outputDiv = document.getElementById('output');
            outputDiv.innerHTML = '';
            deleteMarkers(markersArray);

            var showGeocodedAddressOnMap = function(asDestination) {
                var icon = asDestination ? destinationIcon : originIcon;
                return function(results, status) {
                    if (status === google.maps.GeocoderStatus.OK) {
                        map.fitBounds(bounds.extend(results[0].geometry.location));
                        markersArray.push(new google.maps.Marker({
                            map: map,
                            position: results[0].geometry.location,
                            icon: icon
                        }));
                    } else {
                        alert('Geocode was not successful due to: ' + status);
                    }
                };
            };
            
            for (var i = 0; i < originList.length; i++) {
                var results = response.rows[i].elements;
                geocoder.geocode({'address': originList[i]},
                    showGeocodedAddressOnMap(false));
                for (var j = 0; j < results.length; j++) {
                    geocoder.geocode({'address': destinationList[j]},
                        showGeocodedAddressOnMap(true));
                    outputDiv.innerHTML += originList[i] + ' to ' + destinationList[j] +
                        ': ' + results[j].distance.text + ' in ' +
                        results[j].duration.text + '<br>';
                }
            }
        }
    });
*/
}

};
function deleteMarkers(markersArray) {
    for (var i = 0; i < markersArray.length; i++) {
        markersArray[i].setMap(null);
    }
    markersArray = [];
};


function call(functionToCall) {
    functionToCall();
};
