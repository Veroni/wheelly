// var ws = require('ws').Server,
//           server = new ws({port: 6666}),
//           clients = [];

// if (server) {
//   console.log('server started');
// }

// server.on('connection', function(client)){
//   clients.push(client);



//   client.on('close', function(){
//     console.log('disconnected');
//   });

// };
var five = require('johnny-five'),  
  board = new five.board();
  // one element passed [pwm] for non-derectional Motor pin
  var motorRight = new five.Pin(0);

  var motorLeft = new five.Pin(1);

  board.on("ready", function({

    function moveForward() {
      motorRight.write(0);
      motorLeft.write(0);
    },

    function stopMoving() {
      motorRight.write(1);
      motorLeft.write(1);
    },

    function turnLeft() {
      motorRight.write(1);
      motorLeft.write(0);
    },

    function turnRight() {
      motorRight.write(0);
      motorLeft.write(1);
    }
  }));


client.on('message', function(message) {
  var payload = JSON.parse(message.data);
  var commands = [moveForward, stopMoving, turnLeft, turnRight];

  commands[payload.cmd]();
})