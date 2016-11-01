var map = null;

var loc_id = "";
var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var infoWindow;

function initDisplay(){
	
	directionsDisplay = new google.maps.DirectionsRenderer();
	var myOptions = {
	  zoom: 18,
	  center: {lat: -34.397, lng: 150.644},
	  mapTypeId: google.maps.MapTypeId.ROADMAP
	}
	map = new google.maps.Map(document.getElementById("map"), myOptions);
	
	directionsDisplay.setMap(map);
	directionsDisplay.setPanel(document.getElementById("direction-panel"));
}

var destination_autocomplete;
function initDestinationView(){
	destination_autocomplete =  new google.maps.places.Autocomplete(document.getElementById('end'));
	destination_autocomplete.bindTo('bounds', map);
	
	map.controls[google.maps.ControlPosition.TOP_RIGHT].push(document.getElementById('direction'));
	map.controls[google.maps.ControlPosition.TOP_RIGHT].push(document.getElementById('end'));
}
function initDestinationEvent(){
		google.maps.event.addListener(destination_autocomplete, 'place_changed', function() {
		infowindow.close();
		var place = autocomplete.getPlace();
		if (!place.geometry) {
		  return;
		}

		if (place.geometry.viewport) {
		  map.fitBounds(place.geometry.viewport);
		} else {
		  map.setCenter(place.geometry.location);
		  map.setZoom(17);
		}

		// Set the position of the marker using the place ID and location.
		marker.setPlace(/** @type {!google.maps.Place} */ ({
		  placeId: place.place_id,
		  location: place.geometry.location
		}));
		marker.setVisible(true);

		infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
			'Place ID: ' + place.place_id + '<br>' +
			place.formatted_address + '</div>');
		infowindow.open(map, marker);
  });
}
	
	
var current_pos;	
function getCurrentPosition(){
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			current_pos = {
				lat: position.coords.latitude,
				lng: position.coords.longitude
			};
		}, function() {
			  handleLocationError(true, infoWindow, map.getCenter());
			});
	} else {
		// Browser doesn't support Geolocation
		handleLocationError(false, infoWindow, map.getCenter());
	}
}

function getPositionId(pos){
	var xhr = new XMLHttpRequest();
	var url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + pos.lat + ',' + pos.lng +'&sensor=false';
	var jdata = null;
	
	xhr.open('GET', url);
	xhr.onreadystatechange = function (data) {
		if(jdata==null){
			var tmp=xhr.responseText;
			if(tmp!=""){
				jdata = JSON.parse(tmp)["results"][0];
				loc_id = jdata["place_id"];
			}
		}
	}
	xhr.send();	
}

function showInfo(pos,content){
	infoWindow.setPosition(pos);
	infoWindow.setContent(content);
}

function initialize() {

	initDisplay();
	
	initDestinationView();

	infoWindow = new google.maps.InfoWindow({map: map});
	
	initDestinationEvent();
	getCurrentPosition();
	var test = setInterval(function(){
		getCurrentPosition();
		getPositionId(current_pos);
		showInfo(current_pos,'Current Location');
	}, 500);
	setTimeout(function() {map.setCenter(current_pos);}, 500);

}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
	 infoWindow.setPosition(pos);
	 infoWindow.setContent(browserHasGeolocation ?
						'Error: The Geolocation service failed.' :
						'Error: Your browser doesn\'t support geolocation.');
}


function calcRoute() {
	
	var end = document.getElementById('end').value;
	var request = {
		origin: {'placeId': loc_id},
		destination: end,
		travelMode: google.maps.DirectionsTravelMode.WALKING
	};
	directionsService.route(request, function(response, status) {
	if (status == google.maps.DirectionsStatus.OK) {
		directionsDisplay.setDirections(response);
		}
	});
    
}
