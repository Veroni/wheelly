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



//Initialize express and server
var express = require('express')
var app = express()
        ,server = require('http').createServer(app);

//Access server through port 80
server.listen(80);

//Set '/public' as the static folder
app.use(express.static(_dirname + '/public'));

//Set index.html as the base file
app.get('/', function (req, res) {
        res.sendfile(_dirname + '/index.html')
});

//Link socket.io to the previosly created server
var io = require('socket.io').listen(server);

//When connected
io.sockets.on('connection', function (socket){
        //Send out message
        socket.emit('wheelly connected', { data: 'Connected' });

        //When received 'robot command' message from this connection
        socket.on('robot command', function (data){
                console.log(data);

                //Update Arduino motor values if the received command is correct
                var command = data.command;
        });
});

var five = require('johnny-five'),
        //Initialize connection to Arduino (will crash if none is attached)
        board = new five.board();

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
});


// client.on('message', function(message) {
//   var payload = JSON.parse(message.data);
//   var commands = [moveForward, stopMoving, turnLeft, turnRight];

//   commands[payload.cmd]();
// })