
var g_roadIdArray = [];
var g_roadPosArray = [];

function intiRoad() {

}

function runSnapToRoad(latlngArr) {
  var path = [];
  for (var i = 0; i < latlngArr.length; i++) {
    path.push(latlngArr[i].lat + "," + latlngArr[i].lng);
  }
  $.get('https://roads.googleapis.com/v1/snapToRoads', {
    interpolate: true,
    key: g_apiKey,
    path: path.join('|')
  }, function(data) {
    roadResponse(data);
    clearPolyline();
    drawline();
  });
}

function roadResponse(data) {
  g_roadPosArray = [];
  g_roadIdArray = [];
  for (var i = 0; i < data.snappedPoints.length; i++) {
    var latlng = new google.maps.LatLng(
        data.snappedPoints[i].location.latitude,
        data.snappedPoints[i].location.longitude);
    g_roadPosArray.push(latlng);
    g_roadIdArray.push(data.snappedPoints[i].placeId);
  }
}

var g_polylines = [];
function drawline() {
  var snappedPolyline = new google.maps.Polyline({
    path: g_roadPosArray,
    strokeColor: 'darkblue',
    strokeWeight: 4
  });

  snappedPolyline.setMap(g_map);
  g_polylines.push(snappedPolyline);
}

function clearPolyline() {
  for (var i = 0; i < g_polylines.length; ++i) {
    g_polylines[i].setMap(null);
  }
  g_polylines = [];
}
