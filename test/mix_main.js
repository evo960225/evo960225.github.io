var map = null;
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

var current_id = "";
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
				current_id = jdata["place_id"];
			}
		}
	}
	xhr.send();	
}

function showInfo(pos,content){
	infoWindow.setPosition(pos);
	infoWindow.setContent(content);
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
	 infoWindow.setPosition(pos);
	 infoWindow.setContent(browserHasGeolocation ?
						'Error: The Geolocation service failed.' :
						'Error: Your browser doesn\'t support geolocation.');
}

var cur_distance = 0;
var end_pos;
function calcRoute() {
	
	var end_pos = document.getElementById('end').value;
	var request = {
		origin: {'placeId': current_id},
		destination: end_pos,
		travelMode: google.maps.DirectionsTravelMode.WALKING
	};
	directionsService.route(request, function(response, status) {
		if (status == google.maps.DirectionsStatus.OK) {
			var data = response.routes[0].legs[0].steps;
			var view = document.getElementById("instructions");
			view.innerHTML = data[0].instructions;
			
			
			var i=1;
			var distance = data[0].distance.value;
			while(i<data.length && data[i].maneuver==""){
				distance += data[++i].distance.value;
				view.innerHTML += data[i].instructions;
			}
			
			var vdis = document.getElementById("distance");
			vdis.innerHTML = cur_distance + "尺";
			
			var vdir = document.getElementById("txt_direction");
			vdir.innerText = data[i].maneuver;
			
			if(distance<=500){
				var msec=1000;
				if(distance<=100){msec=200;}
				else if(distance<=200){msec=500;}
				else if(distance<=300){msec=1000;}
				else if(distance<=400){msec=2000;}
				show_direction(data[i].maneuver,msec);
			}else if(distance>500){
				stop_direction();
				
			}
			cur_distance=distance;
			
			directionsDisplay.setDirections(response);
		}
	});
    
}

var showEvent;
var hideEvent;
function show_direction(direction,msec){
	//clearInterval(showEvent);
	//clearInterval(hideEvent);
	if(direction=="turn-left"){
		var view = document.getElementById("left");
		view.innerText="＜"+msec;
		var view = document.getElementById("right");
		view.innerText=0+"＞";
		//showEvent = setInterval(function(){ display_left(true); }, msec);
		//hideEvent = setInterval(function(){ display_left(false); }, msec);
	}else if(direction=="turn-right"){
		var view = document.getElementById("right");
		view.innerText=msec+"＞";
		var view = document.getElementById("left");
		view.innerText="＜"+0;
		//showEvent = setInterval(function(){ display_right(true); }, msec);
		//hideEvent = setInterval(function(){ display_right(false); }, msec);
	}
	
}
function stop_direction(){
	/*clearInterval(showEvent);
	clearInterval(hideEvent);
	display_left(true);
	display_right(true);*/
	var view = document.getElementById("left");
		view.innerText="＜"+0;
	var view = document.getElementById("right");
		view.innerText=0+"＞";
}
function display_right(isblock){
	var view = document.getElementById("right");
	if(isblock){
		view.style.display="block";
	}else{
		view.style.display="none";
	}
}
function display_left(isblock){
	var view = document.getElementById("left");
	if(isblock){
		view.style.display="block";
	}else{
		view.style.display="none";
	}
}


function initialize() {

	initDisplay();
	
	initDestinationView();

	infoWindow = new google.maps.InfoWindow({map: map});
	
	initDestinationEvent();
	
	getCurrentPosition();

	
	var test = setInterval(function(){
		getPositionId(current_pos);
		showInfo(current_pos,'current_pos');
		calcRoute();
		}, 500);
	setTimeout(function() {map.setCenter(current_pos);}, 500);
	
}