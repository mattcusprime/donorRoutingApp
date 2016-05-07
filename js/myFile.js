var funDatCbackTho = function () { alert('I GOT CALLED BACK YO') };
var urlGoogMapsUrl = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCzyiqBO_5XdhIyozK30VcFyDKZiUD_2nw&callback=initMap';
var funGeoCodeFunction;
var map;
var arrMarkerArray = [];
var arrPositions = [];
var objDirectionsService ;//= new google.maps.DirectionsService;
var objDirectionsDisplay;// = new google.maps.DirectionsRenderer;
var objOriginPoint = {};
var objFinalPoint = {};
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

function geocodeAddress(address,labelForMarker,geocoder,resultsMap,shouldICenterTheMap,markerArray,type) {
    //var address = document.getElementById('address').value;
    geocoder.geocode({ 'address': address }, function (results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
            //if (shouldICenterTheMap) { resultsMap.setCenter(results[0].geometry.location) };
            if (shouldICenterTheMap) { resultsMap.panTo(results[0].geometry.location) };
            var marker = new google.maps.Marker({
                map: resultsMap,
                position: results[0].geometry.location,
                label: labelForMarker
            });
            markerArray.push(markerArray);
            var objPositionObject = {};
            objPositionObject.lat = Number(results[0].geometry.location.lat());
            objPositionObject.lng = Number(results[0].geometry.location.lng());
            if (type == "mid") {
                arrPositions.push(objPositionObject);
            }
            else if (type == "origin") {
                objOriginPoint = objPositionObject;
            }
            else if (type == "final") {
                objFinalPoint = objPositionObject;
                /*objDirectionsService = new google.maps.DirectionsService;
                objDirectionsDisplay = new google.maps.DirectionsRenderer;
                objDirectionsDisplay.setMap(map);
                calculateAndDisplayRoute(objDirectionsService, objDirectionsDisplay, objOriginPoint, objFinalPoint, arrPositions);*/
            };
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
            var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            var strMarkerLabel = labels[i];

            if (i == tableData.length - 1) {
                geocodeAddress(strCurrentAddress,strMarkerLabel, geocoder, map, true, arrMarkerArray, "final");
                
            }
            else if (i == 0) {
                geocodeAddress(strCurrentAddress, strMarkerLabel, geocoder, map, false, arrMarkerArray, "origin");
            }
            else {
                geocodeAddress(strCurrentAddress, strMarkerLabel, geocoder, map, false, arrMarkerArray, "mid");
            };
        };
        //console.log(arrMarkerArray);
        /*objDirectionsService = new google.maps.DirectionsService;
        objDirectionsDisplay = new google.maps.DirectionsRenderer;
        objDirectionsDisplay.setMap(map);
        calculateAndDisplayRoute(objDirectionsService, objDirectionsDisplay,objOriginPoint,objFinalPoint,arrPositions);*/

   
}

};

function call(functionToCall) {
    functionToCall();
};
// going to simplify this function..., came from an odd example..
/*
function calculateAndDisplayRoute(directionsService, directionsDisplay,finalDestinationObject,originDestinationObject,arrayOfWaypoints) {
    var waypts = [];
    var checkboxArray = document.getElementById('waypoints');
    for (var i = 0; i < checkboxArray.length; i++) {
        if (checkboxArray.options[i].selected) {
            waypts.push({
                location: checkboxArray[i].value,
                stopover: true
            });
        }
    }
  
    directionsService.route({
        origin: originDestinationObject,
        destination: finalDestinationObject,
        waypoints: arrayOfWaypoints,
        optimizeWaypoints: true,
        travelMode: google.maps.TravelMode.DRIVING
    }, function (response, status) {
        if (status === google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
            var route = response.routes[0];
            var summaryPanel = document.getElementById('directions-panel');
            summaryPanel.innerHTML = '';
            // For each route, display summary information.
            for (var i = 0; i < route.legs.length; i++) {
                var routeSegment = i + 1;
                summaryPanel.innerHTML += '<b>Route Segment: ' + routeSegment +
                    '</b><br>';
                summaryPanel.innerHTML += route.legs[i].start_address + ' to ';
                summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
                summaryPanel.innerHTML += route.legs[i].distance.text + '<br><br>';
            }
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
}  */