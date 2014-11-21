var ws = require('ws').Server,
          server = new ws({port: 6666});

if (server) {
  console.log('server started');
}

server.on('connection', function(client){
  console.log('Got a new web connection.');

  client.on('message', function(message) {
    var payload = JSON.parse(message);
    console.log('CMD:', message);

    var commands = [moveForward, stopMoving, turnLeft, turnRight];

    commands[payload.cmd]();
    });

  client.on('close', function(){
    console.log('disconnected');
  });

  var playload = {cmd: 'system', value: 'Connected to Wheelly'};
  client.send(JSON.stringify(payload));
});


// var raspi = require('raspi-io'),
var five = require("johnny-five"),
        // board, sonar;
        // board;
        //Initialize connection to Arduino (will crash if none is attached)
        board = new five.Board();
          // io: new raspi()
        // });

        //Initialize motors as pin 0(right) and 1(left)
var motorRight = new five.Pin(0);
var motorLeft = new five.Pin(1);

//When connection is ready
board.on("ready", function(){

        function moveForward() {
                motorRight.write(0);
                motorLeft.write(1);
        };

        function stopMoving() {
                motorRight.write(1);
                motorLeft.write(1);
        };

        function turnLeft() {
                motorRight.write(1);
                motorLeft.write(0);
        };

        function turnRight() {
                motorRight.write(0);
                motorLeft.write(1);
        };

        //create a new 'sonar' hardware instance
        // sonar = new five.Sonar(2);

        // sonar.on("data", function(){
        //   console.log("data", "Object is " +  this.inches + "inches away");
        // });
});


