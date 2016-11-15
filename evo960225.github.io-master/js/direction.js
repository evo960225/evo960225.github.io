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
				  g_map.setZoom(17);
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
		}
	});

}
