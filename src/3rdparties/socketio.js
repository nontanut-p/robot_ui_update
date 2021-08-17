'use strict';

var socketio = {
  socket: null,
  init: function(){
    var socket = this.socket = io.connect('', {secure: true, port: 8080});
    socket.on('connect', function(){
      console.log('connected');
    });

    socket.on('request_login', ()=>{
      location.href = 'login.html';
    });

    socket.on('reject_call', (msg)=>{
      if( msg )
        alert(msg);
    });

    socket.on('auth', function(data) {
      console.log('server auth ok');
//      pcConfig.iceServers.push( data.turn );
      socketio.server_auth_ok();
    });

    socket.on('alert', (msg)=>{
      console.warn('alert : '+msg);
      alert(msg);
    });
  },

  server_auth_ok: function(){
    this.socket.on('message', (msg)=>{
      var sender_id = msg.from;
      console.log('message : '+JSON.stringify(msg));
      var message = msg.message;

      if (message.type === 'offer') {
        robot.createPeerConnection( sender_id, msg.auth_type, message );
      }
      else if (message.candidate) {
        robot.add_candidtates(message);
      }
      else{
        console.warn('unknown message');
      }
    });

    this.socket.on('get_robot_list', (robots)=>{
      sidebar.set_robot_list(robots);
    });
    
    this.socket.on('robot_leave', (socket_id)=>{
      console.log('robot_leave : '+socket_id);
      if( robot.socket_id==socket_id ){
        robot.destroy();
      }
      else{
        console.error('robot_leave : socket_id not match : '+robot.socket_id+' / '+socket_id);
      }
    });
    /*
    socket.on('get_all_robot_configs', set_robot_configs);
    socket.on('get_robot_config', load_robot_config);
    socket.on('save_robot_config', (data)=>{
      $('#div_modal_background').hide();
      if( data.result=='success' ){
        if( data.configs!=null )
          set_robot_configs(data.configs, data.saved_config_id);
        alert('Robot config has been saved');
      }
      else if( data.msg )
        alert(data.msg);
    });
    socket.on('remove_robot_config', (data)=>{
      if( data.result=='success' ){
        if( data.configs!=null )
          set_robot_configs(data.configs);
        alert('Robot config has been removed');
      }
      else if( data.msg )
        alert(data.msg);
    });*/

  //  socket.emit('get_all_robot_configs');
    this.socket.emit('get_robot_list');
  },
};
