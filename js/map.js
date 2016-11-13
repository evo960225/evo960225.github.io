/*
	 need:#div map
*/

var g_apiKey = 'AIzaSyAqZmBR0L326jweeAj84JiwM54stfvbOIE';
var g_map = null;
var g_infoWindow;
var g_marker;

function initMap(){
	var myOptions = {
		  zoom: 17,
		  center: {lat: 23.7099419, lng: 120.4798978},
		  mapTypeId: google.maps.MapTypeId.ROADMAP
	}
	g_map = new google.maps.Map(document.getElementById("map"), myOptions);
  g_infoWindow = new google.maps.InfoWindow({map:g_map});
  g_marker = new google.maps.Marker({map:g_map});
}


function showInfo(pos,content){
	g_infoWindow.setPosition(pos);
	g_infoWindow.setContent(content);
}
