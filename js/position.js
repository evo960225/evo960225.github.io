var g_currentPos;
var g_curPositionId = "";

function getCurrentPosition(){
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			sendCurrentPositionToJava(position);
			g_currentPos = {
				lat: position.coords.latitude,
				lng: position.coords.longitude
			};
			getPositionId(g_currentPos);
	  }, function() {
			  alert('get current position error.');
		});
	} else {
		alert('get current position error.');
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
				g_curPositionId = jdata["place_id"];
			}
		}
	}
	xhr.send();
}

function sendCurrentPositionToJava(position){
	if(!window.control)return;
		return window.control.getCurrentPosition(position);
}
