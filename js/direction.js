/*
	 need:
	   #input type=text end
		 #input type=button direction
*/
var directionsDisplay;
var directionsService;
var destination_autocomplete;

function initDirection(){
	directionsDisplay = new google.maps.DirectionsRenderer({preserveViewport:true});
	directionsDisplay.setMap(g_map);
	directionsDisplay.setPanel(document.getElementById("direction-panel"));

	directionsService = new google.maps.DirectionsService();
	destination_autocomplete = new google.maps.places.Autocomplete(document.getElementById('end'));

	destination_autocomplete.bindTo('bounds', g_map);
	g_map.controls[google.maps.ControlPosition.TOP_RIGHT].push(document.getElementById('direction'));
	g_map.controls[google.maps.ControlPosition.TOP_RIGHT].push(document.getElementById('end'));

	google.maps.event.addListener(destination_autocomplete, 'place_changed', function() {
				g_infoWindow.close();
				var place = destination_autocomplete.getPlace();
				if (!place.geometry) {
				  return;
				}

				if (place.geometry.viewport) {
				  g_map.fitBounds(place.geometry.viewport);
				} else {
				  g_map.setCenter(place.geometry.location);
				  g_map.setZoom(15);
				}
				dmarker = new google.maps.Marker({map:g_map});
				dmarker.setPlace({
				  placeId: place.place_id,
				  location: place.geometry.location
				});
				dmarker.setVisible(true);

				g_infoWindow.setContent('<div><strong>' + place.name + '</strong><br>');
				g_infoWindow.open(g_map, dmarker);
	});
}

var g_rotueResponse;
function calcRoute() {
	var end = document.getElementById('end').value;
	var request = {
		origin: new google.maps.LatLng(g_currentPos.lat, g_currentPos.lng),
		destination: end,
		travelMode: google.maps.DirectionsTravelMode.WALKING
	};
	directionsService.route(request, function(response, status) {
	  if (status == google.maps.DirectionsStatus.OK) {
			g_rotueResponse = response;
		  directionsDisplay.setDirections(response);
		  //g_map.setZoom(15);
		}
	});

}

var g_distance = 0;
var g_direct;
var g_d_msec = -1;
var g_d_end = false;
function getRoute(){
  var data = g_rotueResponse.routes[0].legs[0].steps;

  var i=1;
  g_distance = data[0].distance.value;
  while(i<data.length && data[i].maneuver==""){
    g_distance += data[++i].distance.value;
  }

  if(i==0)return -1;
  if(g_distance<=500){
    var msec=1000;
    if(g_distance<=50){g_d_msec=100;}
    else if(g_distance<=100){g_d_msec=300;}
    else if(g_distance<=200){g_d_msec=500;}
    else if(g_distance<=300){g_d_msec=1000;}
    else if(g_distance<=400){g_d_msec=2000;}
    g_direct = data[i].maneuver;
		if(data.length<=1 && g_direct<25) g_d_end = true;
		else g_d_end = false;
    getDirectionToJava();
  }
  return g_distance;
}

function getDirectionToJava(){
	if(!window.control)return;

	if(g_d_end){
	  window.control.getDirection("turn-left",g_d_msec);
		window.control.getDirection("turn-right",g_d_msec);
	}else {
		window.control.getDirection(g_direct,g_d_msec);
	}
}
