
// var http = require("http");
// var fs = require('fs');
// var html = '';

// fs.readFile('./index.html','utf8', function(err, data){
//   if (err) {
//     return console.log(err);
//   }
//   // console.log(data);
//   html = data;
// });

// http.createServer(function(request, response){

//   response.end(html);
// }).listen(6000);

var ws = require('ws').Server,
          server = new ws({port: 4000});

if (server) {
  console.log('server started');
}

// server.on('connection',function(ws){
//   ws.on('message', function(message) {
//     console.log('received: %s', message);
//   });
//   ws.send('hello world');
// });

server.on('connection', function(client){
  console.log('Got a new web connection.');
//   client.send('Hello world');

  client.on('message', function(message) {
    var payload = JSON.parse(message);
    console.log('CMD:', message);

    // var commands = [moveForward, stopMoving, turnLeft, turnRight];
    var commands = { 
                  moveForward: function() { moveForward(32) },
                  moveLeft: function() { moveLeft(32) },
                  moveRight: function() { moveRight(32) },
                  moveBackward: function() { moveBackward(32) }
     };

    commands[payload.cmd]();
    });

  client.on('close', function(){
    console.log('disconnected');
  });

  var payload = {cmd: 'system', value: 'Connected to Wheelly'};
  client.send(JSON.stringify(payload));
});


var raspi = require('raspi-io'),
        five = require("johnny-five"),
        // board, sonar;
        // board;
        //Initialize connection to Arduino (will crash if none is attached)
      board = new five.Board({
          port: "/dev/ttyACM0"//,
          //io: new raspi()
        });

//console.log("board:" + board);
//console.log();

//When connection is ready
board.on("ready", function(){
console.log("board on");

  var leftSpeed = 0;
  var rightSpeed = 0;
  var speedLevels = [0, 32, 64, 128, 255];

	// Configure arduino pin modes
	//this.pinMode(0, five.Pin.OUTPUT);
	//this.pinMode(1, five.Pin.OUTPUT);
	this.pinMode(2, five.Pin.OUTPUT);
	//this.pinMode(3, five.Pin.OUTPUT);
	this.pinMode(4, five.Pin.OUTPUT);
	//this.pinMode(5, five.Pin.OUTPUT);
	//this.pinMode(6, five.Pin.OUTPUT);
	this.pinMode(7, five.Pin.OUTPUT);
	this.pinMode(8, five.Pin.OUTPUT);
	this.pinMode(9, five.Pin.PWM);
	this.pinMode(10, five.Pin.PWM);
	//this.pinMode(11, five.Pin.OUTPUT);
	//this.pinMode(12, five.Pin.OUTPUT);
	//this.pinMode(13, five.Pin.OUTPUT);


	// write pin values to make one motor spin
	//this.digitalWrite(0, 1);
	//this.digitalWrite(1, 1);
  //this.digitalWrite(3, 1);
  //this.digitalWrite(5, 1);
  //this.digitalWrite(11, 1);
  //this.digitalWrite(13, 1);

  // Enable/diagnostic right motor
  this.digitalWrite(6, 1)
  // Enable/diagnostic left motor
  this.digitalWrite(12, 1);

  var stateR = function(num1, num2) {
    // Direction (1) (0) forward, (0) (1) backward
    this.digitalWrite(2, num1);
    this.digitalWrite(4, num2);
  };

  var stateL = function(num1, num2) {
    // Direction (1) (0) forward, (0) (1) backward
    this.digitalWrite(7, num1);
    this.digitalWrite(8, num2);
  };

  function setState(leftSpeed, rightSpeed) {
    if (Math.abs(leftSpeed) > speedLevels.length || Math.abs(rightSpeed) > speedLevels.length) {
      console.log("Error: Speed level is invalid. leftSpeed: " + leftSpeed + ", rightSpeed: " + rightSpeed);
    } else {
      //set direction for left motor
      if (leftSpeed > 0) {
        stateL(1, 0);
      } else if (leftSpeed < 0) {
        stateL(0, 1);
      } else { // leftSpeed == 0
        stateL(0, 0);
      };

      //set direction for right motor
      if (rightSpeed > 0) {
        stateR(1, 0);
      } else if (rightSpeed < 0) {
        stateR (0, 1);
      } else { // rightSpeed == 0
        stateR(0, 0);
      }
    }
  }

  function moveForward(speed) {

    // Speed
    this.analogWrite(9, speed);

    // Speed
    this.analogWrite(10, speed);

    console.log("Forvard move");
        };

  function moveBackward(speed) {
        //Right Motor 
    // Speed
    this.analogWrite(9, speed);

    // Left Motor
    // Speed
    this.analogWrite(10, speed);

    console.log("Backward move");
  };

  function turnLeft(speed) {
    //Right Motor 
    // Speed
    this.analogWrite(9, speed);

    // Left Motor;
    // Speed
    this.analogWrite(10, speed);

    console.log("turn Left");
  };

  function turnRight(speed) {
    //Right Motor 
    // Speed
    this.analogWrite(9, speed);

    // Left Motor
    // Speed
    this.analogWrite(10, speed);

    console.log("turn right");
  };

});


// $(".direction").on('click',function(){
//   var command = {cmd: $(this).data('cmd')};
//   connection.send(JSON.stringify(command));
// });





// var movenent = {
//   connection: null

//   connect: function() {
//     .connection = new WebSocket("ws://127.0.0.1:6666");
//   },
//   init: function() {
//     movement.showChatControls($(this));
//     movement.connect();
//   },
//   listen: function() {
//     if (movement.connection) {
//       movement.connection.onopen = function(){
//         movement.announcement('entered');
//       };
//       movement.connection.onclose = function() {
//         movement.announcement('left');
//       };
//       movement.connection.onmessage = function(message) {
//       var payload = JSON.parse(message.data);
//         movement.payload.cmd](payload);
//       };
//     }
//   },
//   announcement: function(action) {
//   var payload = movement.payload( action );
//     movenent.sendMsg(payload);
//   },

//   payload: function(cmd, param) {
//     return {cmd: cmd, value: param};
//   },
//   sendMsg: function(payload) {
//   movement.connection.send(JSON.stringify(payload));
//   }

//   };

