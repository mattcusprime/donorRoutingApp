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
var stepDisplay;
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
                if (objOriginPoint.setByLocation) {

                }
                else {
                    objOriginPoint = objPositionObject;
                };
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
    
    // Instantiate an info window to hold step text.
    stepDisplay = new google.maps.InfoWindow;
    
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 36, lng: -80 },
        //center: { loc },
        zoom: 15
    });
    var infoWindow = new google.maps.InfoWindow({ map: map });

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            objOriginPoint.lat = position.coords.latitude;
            objOriginPoint.lng = position.coords.longitude;
            objOriginPoint.setByLocation = true;
            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            map.setCenter(pos);
        }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
                          'Error: The Geolocation service failed. Browser most likely does not have permission to use your location.' :
                          'Error: Your browser doesn\'t support geolocation.');
};
    objDirectionsService = new google.maps.DirectionsService;
    objDirectionsDisplay = new google.maps.DirectionsRenderer({ map: map });
    $('#zoomForm').submit(function (event) {
        event.preventDefault();
        var numNewZoom = $('#zoomVal').val();
        numNewZoom = Number(numNewZoom);
        map.setZoom(numNewZoom);
    });
    

    //calculateAndDisplayRoute(objDirectionsDisplay, objDirectionsService, arrMarkerArray, stepDisplay, map);
    var calculateRoute = function(){
        // First, remove any existing markers from the map.
        //var objFinalPoint;
        //var objOriginPoint;
        var arrMidPoints = [];
        for (var i = 0; i < arrMarkerArray.length; i++) {
            arrMarkerArray[i].setMap(null);
        };
        var table = $('#AddressesWithItems').DataTable();
        //$('#tblContainer').fadeOut();
        var tableData = table.rows().data();
        for (var i = 0; i < tableData.length; i++) {
            var objCurrentRow = tableData[i];
            var strCurrentAddress = objCurrentRow.street + "," + objCurrentRow.city + "," + objCurrentRow.state + "," + objCurrentRow.zip_code;
            var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            var strMarkerLabel = labels[i];
            if (i == tableData.length - 1) {
                //geocodeAddress(strCurrentAddress, strMarkerLabel, geocoder, map, true, arrMarkerArray, "final");
                objFinalPoint = strCurrentAddress;

            }
            else if (i == 0) {
                //geocodeAddress(strCurrentAddress, strMarkerLabel, geocoder, map, false, arrMarkerArray, "origin");
                if (objOriginPoint.setByLocation) {

                }
                else {
                    objOriginPoint = strCurrentAddress;
                }
                //objOriginPoint = strCurrentAddress;
            }
            else {
                //geocodeAddress(strCurrentAddress, strMarkerLabel, geocoder, map, false, arrMarkerArray, "mid");
                arrMidPoints.push({
                    location: strCurrentAddress,
                    stopover: true
                });
            };
        };
        var numLengthOfMarkerArray = arrMarkerArray.length;
        // Retrieve the start and end locations and create a DirectionsRequest using
        // WALKING directions.
        objDirectionsService.route({
            origin: objOriginPoint,
            destination: objFinalPoint,
            waypoints: arrMidPoints,
            optimizeWaypoints: true,
            travelMode: google.maps.TravelMode.DRIVING
        }, function (response, status) {
            // Route the directions and pass the response to a function to create
            // markers for each step.
            if (status === google.maps.DirectionsStatus.OK) {
                document.getElementById('warnings-panel').innerHTML =
                    '<b>' + response.routes[0].warnings + '</b>';
                objDirectionsDisplay.setDirections(response);
                showSteps(response, arrMarkerArray, stepDisplay, map);
            } else {
                window.alert('Directions request failed due to ' + status);
            }
        });
    };
    $('#routeAddresses').click(function () {
        //call(funGeoCodeFunction);
        //funGeoCode();
        calculateRoute();
        //calculateAndDisplayRoute(objDirectionsDisplay, objDirectionsService, arrMarkerArray, stepDisplay, map);
    });
};


function showSteps(directionResult, markerArray, stepDisplay, map) {
    // For each step, place a marker, and add the text to the marker's infowindow.
    // Also attach the marker to an array so we can keep track of it and remove it
    // when calculating new routes.
    var myRoute = directionResult.routes[0].legs[0];
    for (var i = 0; i < myRoute.steps.length; i++) {
        var marker = markerArray[i] = markerArray[i] || new google.maps.Marker;
        marker.setMap(map);
        marker.setPosition(myRoute.steps[i].start_location);
        attachInstructionText(
            stepDisplay, marker, myRoute.steps[i].instructions, map);
    }
};

function attachInstructionText(stepDisplay, marker, text, map) {
    google.maps.event.addListener(marker, 'click', function () {
        // Open an info window when the marker is clicked on, containing the text
        // of the step.
        stepDisplay.setContent(text);
        stepDisplay.open(map, marker);
    });
};

function funGeoCode() {
    var table = $('#AddressesWithItems').DataTable();
    $('#tblContainer').fadeOut();
    var tableData = table.rows().data();
    for (var i = 0; i < tableData.length; i++) {
        var objCurrentRow = tableData[i];
        var strCurrentAddress = objCurrentRow.street + "," + objCurrentRow.city + "," + objCurrentRow.state + "," + objCurrentRow.zip_code;
        var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var strMarkerLabel = labels[i];

        if (i == tableData.length - 1) {
            geocodeAddress(strCurrentAddress, strMarkerLabel, geocoder, map, true, arrMarkerArray, "final");

        }
        else if (i == 0) {
            geocodeAddress(strCurrentAddress, strMarkerLabel, geocoder, map, false, arrMarkerArray, "origin");
        }
        else {
            geocodeAddress(strCurrentAddress, strMarkerLabel, geocoder, map, false, arrMarkerArray, "mid");
        };
    };
    //calculateAndDisplayRoute(objDirectionsDisplay, objDirectionsService, arrMarkerArray, stepDisplay, map);


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
//directionservice rebuild
function calculateAndDisplayRouteV2(directionsService, directionsDisplay) {
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
        origin: document.getElementById('start').value,
        destination: document.getElementById('end').value,
        waypoints: waypts,
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
};
//directionservice rebuild