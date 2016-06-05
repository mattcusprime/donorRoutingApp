var funDatCbackTho = function () { alert('I GOT CALLED BACK YO') };
var urlGoogMapsUrl = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCzyiqBO_5XdhIyozK30VcFyDKZiUD_2nw&callback=initMap';
var funGeoCodeFunction;
var map;
//var infoWindow;
var arrMarkerArray = [];
var arrPositions = [];
var objDirectionsService;//= new google.maps.DirectionsService;
var objDirectionsDisplay;// = new google.maps.DirectionsRenderer;
var objOriginPoint = {};
var objFinalPoint = {};
var stepDisplay;
var arrLastCalculatedRoute = [];
var currentRoute;
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

function geocodeAddress(address, labelForMarker, geocoder, resultsMap, shouldICenterTheMap, markerArray, type) {
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
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
                          'Error: The Geolocation service failed. Browser most likely does not have permission to use your location.' :
                          'Error: Your browser doesn\'t support geolocation.');
};
var panorama;// dat global
function initMap() {

    // Instantiate an info window to hold step text.
    stepDisplay = new google.maps.InfoWindow;
    var numInitialLat = 36;
    var numInitialLng = -80;
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: numInitialLat, lng: numInitialLng },
        //center: { loc },
        zoom: 15
    });
    var infoWindow = new google.maps.InfoWindow({ map: map });
    panorama = new google.maps.StreetViewPanorama(
      document.getElementById('pano'), {
          position: { lat: numInitialLat, lng: numInitialLng },
          pov: {
              heading: 270,
              pitch: 0
          },
          visible: false
      });

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
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
        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
    
    
   
    //calculateAndDisplayRoute(objDirectionsDisplay, objDirectionsService, arrMarkerArray, stepDisplay, map);
    var calculateRoute = function () {
        // First, remove any existing markers from the map.
        //var objFinalPoint;
        //var objOriginPoint;
        objDirectionsService = new google.maps.DirectionsService;
        objDirectionsDisplay = new google.maps.DirectionsRenderer({ map: map });
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
        //var numLengthOfMarkerArray = arrMarkerArray.length;
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
                currentRoute = response.routes[0];
                document.getElementById('warnings-panel').innerHTML =
                    '<b>' + response.routes[0].warnings + '</b>';
                objDirectionsDisplay.setDirections(response);
                showSteps(response, arrMarkerArray, stepDisplay, map);
                //resetPanorama(objOriginPoint, arrMarkerArray, objFinalPoint);
                //var summaryPanel = document.getElementById('directions-panel');
                //summaryPanel.innerHTML = '';
                $('#directionsTable').remove();
                $('#directions-panel').show();
                var strTableString = '<table id="directionsTable" class="display compact cell-border"><thead><tr><th>Step</th><th>Route</th></tr></thead><tbody>'
                // For each route, display summary information.
                for (var i = 0; i < currentRoute.legs[0].steps.length; i++) {
                    var routeSegment = i + 1;
                    //summaryPanel.innerHTML += currentRoute.legs[0].steps[i].instructions + '<br>';
                    strTableString += '<tr><td>' + routeSegment + '</td><td>' + currentRoute.legs[0].steps[i].instructions + '</td></tr>';
                };
                strTableString += "</tbody></table>";
                $('#directions-panel').append(strTableString);
                var arrButtons = ['copy','pdf'];
                var strDomString = '<"top"Bpl>rt<"bottom"fl><"clear">';
                $('#directionsTable').DataTable({
                    'pageLength': 50,
                    'buttons': arrButtons,
                    'dom': strDomString
                });
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

//var panorama;
function showSteps(directionResult, markerArray, stepDisplay, map) {
    // For each step, place a marker, and add the text to the marker's infowindow.
    // Also attach the marker to an array so we can keep track of it and remove it
    // when calculating new routes.
    var arrAllMarkers = [];
    var myRoute = directionResult.routes[0].legs[0];
    for (var i = 0; i <= myRoute.steps.length; i++) {
        

        
        if (i != myRoute.steps.length) {
            var marker = markerArray[i] = markerArray[i] || new google.maps.Marker;
            marker.setMap(map);
            marker.setPosition(myRoute.steps[i].start_location);
            attachInstructionText(stepDisplay, marker, myRoute.steps[i].instructions, map);
        }
        else {
            var marker = markerArray[i] = markerArray[i] || new google.maps.Marker;
            marker.setMap(map);
            marker.setPosition(directionResult.routes[0].legs[0].end_location);
            var position = marker.getPosition();
            var objposition = {};
            objposition.lat = position.lat();
            objposition.lng = position.lng();
            google.maps.event.addListener(marker, 'click', function () {
                addStreetListenToMarker(objposition);
            });
            //attachInstructionText(stepDisplay, marker, directionResult.routes[0].legs[0].end_address, map);
        };
       
    }
    
};
function toggleStreetView() {
    var toggle = panorama.getVisible();
    if (toggle == false) {
        panorama.setVisible(true);
    } else {
        panorama.setVisible(false);
    }
};

function attachInstructionText(stepDisplay, marker, text, map) {
        google.maps.event.addListener(marker, 'click', function () {
            // Open an info window when the marker is clicked on, containing the text
            // of the step.
            stepDisplay.setContent(text);
            stepDisplay.open(map, marker);
            var position = marker.getPosition();
            var objposition = {};
            objposition.lat = position.lat();
            objposition.lng = position.lng();
            addStreetListenToMarker(objposition);
        });
    
};
/*function resetPanorama(arrayOfMarkers) {

    for (var i = 0; i < arrayOfMarkers.length; i++) {
        var marker = arrayOfMarkers[i];
        try {
            marker.addListener('click', function () {

                addStreetListenToMarker(marker);
            });
        }
        catch (e) {
            continue;
        }
    };
};*/
function addStreetListenToMarker(objposition) {
    
    panorama.setPosition(objposition);
    //toggleStreetView();
    var visCheck = panorama.getVisible();
    if (visCheck == false) {
        panorama.setVisible(true);
    };
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
function strip(html) {
    var tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
};
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
function initStreetView(markerToUse, mapToUse) {
    var markerPosition = markerToUse.getPosition();
    var objPositionObject = {
        lat: markerPosition.lat(),
        lng: markerPosition.lng()
    };

    var panorama = new google.maps.StreetViewPanorama(
        document.getElementById('pano'), {
            position: markerPosition,
            pov: {
                heading: 34,
                pitch: 10
            }
        });
    /*panorama.setPosition(objPositionObject);
    panorama.setPov(({
        heading: 265,
        pitch: 0
    }));*/
    mapToUse.setStreetView(panorama);
};
function pdfRoute(arrayWithInstructionsObjects) {
    var docDefinition = {};
    docDefinition.content = [];
    docDefinition.footer = function (currentPage, pageCount) { return currentPage.toString() + ' of ' + pageCount; },
    docDefinition.header = function (currentPage, pageCount) {
        // you can apply any logic and return any valid pdfmake element

        return { text: "Your Directions", alignment: (currentPage % 2) ? 'left' : 'right' };
    };
    var objLayoutObject = {
        hLineWidth: function (i, node) {
            return (i === 0 || i === node.table.body.length) ? 2 : 1;
        },
        vLineWidth: function (i, node) {
            return (i === 0 || i === node.table.widths.length) ? 2 : 1;
        },
        hLineColor: function (i, node) {
            return (i === 0 || i === node.table.body.length) ? 'black' : 'gray';
        },
        vLineColor: function (i, node) {
            return (i === 0 || i === node.table.widths.length) ? 'black' : 'gray';
        },
        // paddingLeft: function(i, node) { return 4; },
        // paddingRight: function(i, node) { return 4; },
        // paddingTop: function(i, node) { return 2; },
        // paddingBottom: function(i, node) { return 2; }
    };
    docDefinition.pageOrientation = 'landscape';
    docDefinition.styles = {
        header: {
            fontSize: 18,
            bold: true,
            margin: [0, 0, 0, 10]
        },
        subheader: {
            fontSize: 16,
            bold: true,
            margin: [0, 10, 0, 5]
        },
        tableExample: {
            margin: [0, 5, 0, 15]
        },
        tableHeader: {
            bold: true,
            fontSize: 13,
            color: 'black'
        }
    };
    for (var i = 0; i < arrayWithInstructionsObjects.length; i++) {
        var strInstructionText = strip(arrayWithInstructionsObjects[i].instructions);
        strInstructionText = strInstructionText.replace("Destination", "\n\nDestination");
        docDefinition.content.push("\n");
        docDefinition.content.push(strInstructionText);

    };
    pdfMake.createPdf(docDefinition).open();
};