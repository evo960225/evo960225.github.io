var g_currentPos;
var g_curPositionId = "";

function getCurrentPosition(){
	if (navigator.geolocation) {
	  navigator.geolocation.getCurrentPosition(function(position) {
			sendCurrentPositionToJava(position.coords.latitude,position.coords.longitude);
			g_currentPos = {
				lat: position.coords.latitude,
				lng: position.coords.longitude
			};
			getPositionId(g_currentPos);
	  }, function() {
			  
	  });
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
				var tmpdata = JSON.parse(tmp);
				if(tmpdata != null){
				  jdata = tmpdata["results"][0];
				  g_curPositionId = jdata["place_id"];
				}
			}
		}
	}
	xhr.send();
}

function sendCurrentPositionToJava(lat,lng){
	if(!window.control)return;
		return window.control.getCurrentPosition(lat,lng);
}
