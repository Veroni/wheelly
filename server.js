
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


var raspi = require('raspi-io'),
        five = require("johnny-five"),
        // board, sonar;
        // board;
        //Initialize connection to Arduino (will crash if none is attached)
      board = new five.Board({
          port: "/dev/ttyACM0",
          io: new raspi()
        });


//When connection is ready
board.on("ready", function(){
        var speed, motors;
        //Initialize motors as pin 0(right) and 1(left)
        speed = 100;
        motors = {
        right: new five.Motor(0),
        left: new five.Motor(1)
        };

        this.repl.inject({
          motors: motors
        });

        function moveForward() {
                motors.right.start(speed);
                motors.left.start(speed);
        };

        function stopMoving() {
                motors.right.stop();
                motors.left.stop();
        };

        function turnLeft() {
                motors.right.start(speed);
                motors.left.stop();
        };

        function turnRight() {
                motors.right.stop();
                motors.left.start(speed);
        };
});

$(".direction").on('click',function(){
  var command = {cmd: $(this).data('cmd')};
  connection.send(JSON.stringify(command));
})


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

