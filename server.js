
var ws = require('ws').Server,
          server = new ws({port: 4000});


var raspi = require('raspi-io'),
        five = require("johnny-five"),
        //Initialize connection to Arduino (will crash if none is attached)
      board = new five.Board({
          port: "/dev/ttyACM0"
        });

//When connection is ready
board.on("ready", function(){
console.log("board on");

  if (server) {
  console.log('server started');
  }

  server.on('connection', function(client){
    console.log('Got a new web connection.');
    //   client.send('New connection');

    client.on('message', function(message) {
      var payload = JSON.parse(message);
      console.log('CMD:', message);

      var commands = { 
                  moveForward: function() { moveForward() },
                  moveLeft: function() { moveLeft() },
                  moveRight: function() { moveRight() },
                  moveBackward: function() { moveBackward() },
                  softStop: function() { softStop() },
                  hardStop: function() { hardStop() }
      };

      commands[payload.cmd]();
    });

  client.on('close', function(){
    console.log('disconnected');
  });

  var payload = {cmd: 'system', value: 'Connected to Wheelly'};
  client.send(JSON.stringify(payload));
  });

  var leftSpeed = 0;
  var rightSpeed = 0;
  var indexR = 0;
  var indexL = 0;
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
    board.digitalWrite(2, num1);
    board.digitalWrite(4, num2);
  };

  var stateL = function(num1, num2) {
    // Direction (1) (0) forward, (0) (1) backward
    board.digitalWrite(7, num1);
    board.digitalWrite(8, num2);
  };

  // var setMotorDirection = function(speed, state) {
  //     if (speed > 0) {
  //       state(1, 0);
  //     } else if (Speed < 0) {
  //       stateL(0, 1);
  //     } else { // Speed == 0
  //       state(0, 0);
  //     }
  // };

  function setState(rightSpeed, leftSpeed) {
    if (Math.abs(leftSpeed) > speedLevels.length || Math.abs(rightSpeed) > speedLevels.length) {
      console.log("Error: Speed level is invalid. leftSpeed: " + leftSpeed + ", rightSpeed: " + rightSpeed);
    } else {
      //set direction for left motor
      //setMotorDirection(leftSpeed, stateL);
      //setMotorDirection(rightSpeed, stateR);
      if (leftSpeed > 0) {
        stateL(1, 0);
      } else if (leftSpeed < 0) {
        stateL(0, 1);
      } else { // leftSpeed == 0
        stateL(1, 0);
      };

      //set direction for right motor
      if (rightSpeed > 0) {
        stateR(1, 0);
      } else if (rightSpeed < 0) {
        stateR (0, 1);
      } else { // rightSpeed == 0
        stateR(0, 1);
      }
    }
  };

  function setSpeed(deltaR, deltaL) {

    // Speed right motor
    // indexR = speedLevels.indexOf(rightSpeed) + deltaR;
    indexR += deltaR;
    if (Math.abs(indexR) < speedLevels.length){
      rightSpeed = speedLevels[Math.abs(indexR)];
      board.analogWrite(9, rightSpeed);
    } else {
      console.log("Maximum speed");
    };
    // Speed left motor
    // indexL = speedLevels.indexOf(leftSpeed) + deltaL;
    indexL += deltaL;
    if (Math.abs(indexL) < speedLevels.length){
      leftSpeed = speedLevels[Math.abs(indexL)];
      board.analogWrite(10, leftSpeed);
    } else {
      console.log("Maximum speed");
    }
    setState(indexR, indexL);
  };

  // function checkSpeedLevel(speed) {
  //   return speedLevels.indexOf(speed);
  // };

  function moveForward() {
    setSpeed(1, 1);
    // setState(leftSpeed, rightSpeed);

    console.log("Forvard move");
  };

  function moveBackward() {
    setSpeed(-1, -1);
    // setState(-leftSpeed, -rightSpeed);

    console.log("Backward move");
  };

  function moveLeft() {
    setSpeed(1, -1);
    // setState(-leftSpeed, rightSpeed);

    console.log("Move Left");
  };

  function moveRight() {
    setSpeed(-1, 1);
    // setState(leftSpeed, -rightSpeed);

    console.log("Move right");
  };

  function softStop() {
    board.analogWrite(9, 0);
    board.analogWrite(10, 0);
    indexL = 0;
    indexR = 0;

    console.log("Soft Stop");
  }

  function hardStop() {
    board.digitalWrite(2, 0);
    board.digitalWrite(4, 0);
    board.digitalWrite(7, 0);
    board.digitalWrite(8, 0);
    board.analogWrite(9, 255);
    board.analogWrite(10, 255);
    indexL = 0;
    indexR = 0;

    console.log("Hard Stop");
  };

});


