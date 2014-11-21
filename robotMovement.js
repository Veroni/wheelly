var movement = {
  connection: null,
  commands: [],
  connect: function(){
    movement.connection = new WebSocket("ws://127.0.0.1:6666");
  },
  listen: function(){
    if (movement.connection){
      movement.connection.onclick = function(command) {
        var payload = JSON.parse(command.data);
        movement[payload.cmd](payload);
      };
    }
  },
  init: function(){
    movement.connect();
    movement.listen();
  },
  payload: function(cmd, param) {
    return {cmd: cmd, value: param};
  },
  showMovementControls: function(join) {
    var sendBtn = $("#connectWheelly");
    join.off('click').hide();
    sendBtn.add()
  }
};

// $(function){
//     $('.connectWheelly').on('click', movement.init)
// };

$(".direction").on('click',function(){
  var command = {cmd: $(this).data('cmd')};
  connection.send(JSON.stringify(command));
})