document.addEventListener("deviceready", onDeviceReady, false);

var lastX,lastY,lastZ;
var red = 127;
var green = 127;
var blue = 127;

function onDeviceReady() {
    navigator.accelerometer.watchAcceleration(gotMovement, errHandler, { frequency:50 });	
}

function errHandler(e) {
    console.log("--- ERROR ---");
    console.dir(e);
}

function gotMovement(acceleration) {

    if(!lastX) {
        lastX = acceleration.x;
        lastY = acceleration.y;
        lastZ = acceleration.z;
        return;
    }

    var deltaX, deltaY, deltaZ;
    deltaX = acceleration.x-lastX;
    deltaY = acceleration.y-lastY;
    deltaZ = acceleration.z-lastZ;

    lastX = acceleration.x;
    lastY = acceleration.y;
    lastZ = acceleration.z;

    var measurements = "X: "+acceleration.x+"<br>Y: "+acceleration.y+"<br>Z: "+acceleration.z+"<br><br>dX: "+deltaX+"<br>dY: "+deltaY+"<br>dZ: "+deltaZ;
    
    $("body").html(measurements);
    
    red = red + (Math.round(deltaX)*10);
    green = green - (Math.round(deltaY)*10);
    blue = blue - (Math.round(deltaZ)*10);
    
    $("body").css("background-color","rgb("+red+","+green+","+blue+")");
    
    console.log(red+","+green+","+blue);


/*
time = new Date().getTime();
interval = time - prevTime;
prevTime = time;

//Isolating gravity vector
gravity.x = currentAcceleration.x * kFileringFactor + gravity.x * (1.0 - kFileringFactor);
gravity.y = currentAcceleration.y * kFileringFactor + gravity.y * (1.0 - kFileringFactor);
gravity.z = currentAcceleration.z * kFileringFactor + gravity.z * (1.0 - kFileringFactor);
float gravityNorm = sqrt(gravity.x * gravity.x + gravity.y * gravity.y + gravity.z * gravity.z);

//Removing gravity vector from initial acceleration
filteredAcceleration.x = acceleration.x - gravity.x / gravityNorm;
filteredAcceleration.y = acceleration.y - gravity.y / gravityNorm;
filteredAcceleration.z = acceleration.z - gravity.z / gravityNorm;

//Calculating velocity related to time interval
velocity.x = velocity.x + filteredAcceleration.x * interval;
velocity.y = velocity.y + filteredAcceleration.y * interval;
velocity.z = velocity.z + filteredAcceleration.z * interval;

//Finding position
position.x = position.x + velocity.x * interval * 160;
position.y = position.y + velocity.y * interval * 230;
*/
}
