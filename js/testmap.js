document.addEventListener('keydown', function(event) {
  if(event.keyCode == 37) {
    move('L');
  }
  else if(event.keyCode == 38) {//up
    move('U');
  }
  else if(event.keyCode == 39) {
    move('R');
  }
  else if(event.keyCode == 40) {//down
    move('D');
  }
});

function move(direction){
var speed = document.getElementById('speed').value/500000.0;
  if(direction=='L'){
    g_currentPos.lng-=speed;
  }else if(direction=='U'){
    g_currentPos.lat+=speed;
  }else if(direction=='D'){
    g_currentPos.lat-=speed;
  }else if(direction=='R'){
    g_currentPos.lng+=speed;
  }
}

function showDirection(){
  var data = g_rotueResponse.routes[0].legs[0].steps;
  var view = document.getElementById("instructions");
  view.innerHTML = data[0].instructions;


  var i=1;
  var distance = data[0].distance.value;
  while(i<data.length && data[i].maneuver==""){
    distance += data[++i].distance.value;
    view.innerHTML += data[i].instructions;
  }

  if(i==0)return;
  var vdis = document.getElementById("distance");
  vdis.innerHTML = distance + "尺";

  var vdir = document.getElementById("txt_direction");
  vdir.innerText = data[i].maneuver;

  if(distance<=500){
    var msec=1000;
    if(distance<=50){msec=100;}
    else if(distance<=100){msec=300;}
    else if(distance<=200){msec=500;}
    else if(distance<=300){msec=1000;}
    else if(distance<=400){msec=2000;}
    show_direction(data[i].maneuver,msec);
  }else if(distance>500){
    stop_direction();
  }
  cur_distance=distance;
}
function show_direction(direction,msec){
	if(direction=="turn-left"){
		var view = document.getElementById("left");
		view.innerText="＜"+msec;
		var view = document.getElementById("right");
		view.innerText=0+"＞";
	}else if(direction=="turn-right"){
		var view = document.getElementById("right");
		view.innerText=msec+"＞";
		var view = document.getElementById("left");
		view.innerText="＜"+0;
	}

}
function stop_direction(){
	var view = document.getElementById("left");
		view.innerText="＜"+0;
	var view = document.getElementById("right");
		view.innerText=0+"＞";
}
