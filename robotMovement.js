var movement = {
  connection: null,
  commands: [],
  connect: function(){
    movement.connection = new WebSocket("ws://localhost:4000");
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
    // alert('socket initialized');
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
