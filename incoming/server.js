
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
                  moveForward: function() { console.log("moveForward"); },
                  moveLeft: function() { console.log("moveLeft"); },
                  moveRight: function() { console.log("moveRight"); },
                  moveBackward: function() { console.log("moveBackward"); }
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
console.log();

//When connection is ready
board.on("ready", function(){
console.log("board on");
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

	//this.pinMode(4, five.Pin.OUTPUT);
	//this.pinMode(6, five.Pin.OUTPUT);
	//this.pinMode(9, five.Pin.OUTPUT);

	// write pin values to make one motor spin
	//this.digitalWrite(0, 1);
	//this.digitalWrite(1, 1);
	this.digitalWrite(2, 1);
	//this.digitalWrite(3, 1);
	this.digitalWrite(4, 0);
	//this.digitalWrite(5, 1);
	this.digitalWrite(6, 1);
	this.digitalWrite(7, 1);
	this.digitalWrite(8, 0);
	this.analogWrite(9, 32);
	this.analogWrite(10, 32);
	//this.digitalWrite(11, 1);
	this.digitalWrite(12, 1);
	//this.digitalWrite(13, 1);

	//var pin2 = new five.Pin(2);
	//var pin4 = new five.Pin(4);
	//var pin6 = new five.Pin(6);
	//var pin9 = new five.Pin(9);

	//pin9.write(1);
	//pin2.high();
	//pin4.low();
	//pin6.read(function(p) {	console.log(p);});
	//console.log("50");	

       // var speed, motors;
        //Initialize motors as pin 0(right) and 1(left)
       // speed = 400;

      // set the motor going forward full speed
 //         motors.left.forward(255);
        });


//         function moveForward() {
//                 motors.right.start(speed);
//                 motors.left.start(speed);
//                 // console.log("Forvard move");
//         };

//         function moveBackward() {
//                 motors.right.stop();
//                 motors.left.stop();
//                 // console.log("stop");
//         };

//         function turnLeft() {
//                 motors.right.start(speed);
//                 motors.left.stop();
//                 // console.log("turn Left");
//         };

//         function turnRight() {
//                 motors.right.stop();
//                 motors.left.start(speed);
//                 // console.log("turn right");
//         };
// });

// $(".direction").on('click',function(){
//   var command = {cmd: $(this).data('cmd')};
//   connection.send(JSON.stringify(command));
// });



// //When connection is ready
// board.on("ready", function(){
//         //Initialize motors as pin 0(right) and 1(left)
//         var motorRight = new five.Pin(0);
//         var motorLeft = new five.Pin(1);

//         this.repl.inject({
//           motorLeft: motorLeft;
//           motorRight: motorRight;
//         })

//         function moveForward() {
//                 motorRight.write(0);
//                 motorLeft.write(1);
//         };

//         function stopMoving() {
//                 motorRight.write(1);
//                 motorLeft.write(1);
//         };

//         function turnLeft() {
//                 motorRight.write(1);
//                 motorLeft.write(0);
//         };

//         function turnRight() {
//                 motorRight.write(0);
//                 motorLeft.write(1);
//         };

//         //create a new 'sonar' hardware instance
//         // sonar = new five.Sonar(2);

//         // sonar.on("data", function(){
//         //   console.log("data", "Object is " +  this.inches + "inches away");
//         // });
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

