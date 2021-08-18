import SimplePeer from 'simple-peer';
import io from 'socket.io-client';
import wrtc from 'wrtc';

var pc = {
	cpuUsage: 0,
	ramUsage: 0,
	battery: 0,
	temp: 0,
};
let gnssData = {
	lat: 0,
	lon: 0,
	alt: 0,
	dir: 0,
	velo: 0,
	x: 0,
	y: 0,
	dis: 0,
};

let gazebo_sim_ll = []
var base64Img = 0;
var exportData = [pc, false, base64Img, gazebo_sim_ll];
const URL = 'https://weather.mtec.or.th';

const email = 'pat',
	pass = 'agrimtec';
var socket = null;
new Promise((resolve, reject) => {
	socket = io.connect(URL);

	socket.on('connect', function () {
		console.log('socket connected');
	});
	// need log in
	socket.on('request_login', () => {
		//console.log('request_login');
		socket.emit('login', { email: email, pass: pass });
	});

	// login succeeded
	socket.on('auth', function (data) {
		//console.log('auth ok');
		// get list of the robots that are currently online
		socket.emit('get_robot_list');
	});

	socket.on('unauth', function (data) {
		console.warn('cannot log in');
	});

	// got robot list
	socket.on('get_robot_list', function (robots) {
		if (!robots.peer) {
			console.log('undefine robot not peer');
			console.log('socket ID', socket.id);
			//console.log(robots[0])
			//console.log('robot socket name', robots[0].socket_id)
		}

		// connect to the first robot if exists
		if (robots.length > 0 && !robot.peer) {
			robot.connect(robots[0].socket_id);
			exportData[1] = true;
		} else {
			console.log('Error Here');
			exportData[1] = false;
		}
	});

	// got message from server
	socket.on('message', (msg) => {
		var sender_id = msg.from;
		//console.log('sender_id', sender_id, 'msg auth type', msg.auth_type , 'message', msg.message)
		//console.log('message : '+JSON.stringify(msg));
		var message = msg.message;

		if (message.type === 'offer') {
			console.log('got offer');
			robot.createPeerConnection(sender_id, msg.auth_type, message);
		} else if (message.candidate) {
			robot.add_candidtates(message);
		} else {
			console.warn('unknown message');
		}
	});

	// receive when robot went offline
	socket.on('robot_leave', (socket_id) => {
		console.log('robot_leave : ' + socket_id);
		if (robot.socket_id == socket_id) {
			robot.destroy();
		} else {
			console.error(
				'robot_leave : socket_id not match : ' +
					robot.socket_id +
					' / ' +
					socket_id
			);
		}
	});

	// receive when the robot refused the connection
	socket.on('reject_call', (msg) => {
		console.warn('reject_call');
	});

	// got error message
	socket.on('alert', (msg) => {
		console.warn('alert : ' + msg);
		alert(msg);
	});
});

var robot = {
	pcConfig: {
		iceServers: [
			{
				urls: 'stun:stun.l.google.com:19302',
			},
		],
	},

	socket_id: null,
	candidates: [],
	peer: null,
	auth_type: null,
	b_connected: false,
	timer_check_ready: null,

	connect: function (socket_id) {
		console.log('connect robot');
		if (this.socket_id) {
			console.warn('robot already exists');
			return;
		}
		this.candidates = [];
		this.socket_id = socket_id;
		socket.emit('message', {
			to: socket_id,
			message: {
				type: 'call',
			},
		});
	},

	disconnect: function () {
		console.log('disconnect robot');
		if (this.peer) this.send_peer({ event: 'bye' });
		this.destroy();
	},

	destroy: function () {
		if (this.socket_id) {
			this.socket_id = null;
			setTimeout(() => {
				if (this.peer) {
					this.peer.destroy();
					this.peer = null;
				}
			}, 100);
			if (this.timer_check_ready) {
				clearInterval(this.timer_check_ready);
				this.timer_check_ready = null;
			}
		}
	},

	send_peer: function (data) {
		//console.log('send_peer', data);
		this.peer.send(JSON.stringify(data));
	},

	createPeerConnection: function (socket_id, auth_type, msg) {
		if (!this.socket_id) {
			console.error('robot not connect');
			return;
		}
		var th = this;
		/*    if( pcConfig.iceServers.length<=1 ){
                console.log('wait ice servers');
                setTimeout( ()=>{ th.createPeerConnection(socket_id, auth_type, msg); }, 200);
                return;
            }*/
		console.log('createPeerConnection');
		th.socket_id = socket_id;
		th.auth_type = auth_type;
		var peer = (this.peer = new SimplePeer({
			initiator: false,
			config: this.pcConfig,
		}));
		peer.on('error', (err) => {
			console.error(err);
		});
		peer.on('connect', () => {
			console.log('peer connected');
			exportData[1] = true;
			th.b_connected = true;
			if (!th.timer_check_ready) {
				th.timer_check_ready = setInterval(() => {
					th.send_peer({ event: 'ready' });
				}, 1000);
			}
		});

		peer.on('close', () => {
			console.log('peer closed');
			th.b_connected = false;
			th.destroy();
		});
		peer.on('signal', (data) => {
			//console.log('signal : ' + JSON.stringify(data));
			th.sendMessage(data);
		});
		peer.on('data', (data) => {
			
			try {
				data = JSON.parse(data);
				//console.log('got data : ', data);
			} catch (e) {
				console.warn('cannot parse data');
				return;
			}
			// console.log('data : ' + JSON.stringify(data));
			if (data.event == 'ready') {
				//console.log('robot ready');
				if (th.timer_check_ready) {
					clearInterval(th.timer_check_ready);
					th.timer_check_ready = null;
				}
				// th.send_peer({event:'get_path_list'});
				//setInterval(() => th.send_peer({ event: 'get_pc_status' }), 5000);
				setInterval(() => th.send_peer({ event: 'stream' }), 150);
				//setInterval(() => th.send_peer({ event: 'gnssMessage' }), 5000);
				setInterval(() => th.send_peer({ event: 'gazebo_sim' }), 500);
			} else if (data.event == 'get_pc_status') {
				pc.cpuUsage = data.status.cpuUsage;
				pc.ramUsage = data.status.ramUsage;
				pc.battery = data.status.battery;
				pc.temp = data.status.temp;
			} else if (data.event == 'gazebo_sim') {
		
				exportData[3] = data.data
				//console.log('test for data ', data.data);
			} else if (data.event == 'stream') {
				//base64Img = data.base64Img

				exportData[2] = data.base64;
				console.log('stream got data ')
				//console.log('base64Img ', exportData[2])
			} else if (data.event == 'get_path_list') {
				//console.log('got path list');
				if (data.err) {
					console.error(data.err);
				} else {
					if (data.paths.length > 0) {
						console.log('data.path', data.paths);
						th.send_peer({ event: 'get_path', name: data.paths[0] });
					}
				}
			} else if (data.event == 'get_path') {
				console.log('got path');
				if (data.err) {
					console.error(data.err);
				}
			}
		});

		this.candidates.forEach((c) => {
			peer.signal(c);
		});
		peer.signal(msg);
	},

	sendMessage: function (message) {
		var msg = { to: this.socket_id, message: message };
		try {
			console.log('send message : ' + JSON.stringify(msg));
		} catch (e) {
			console.log('send message : [Circular]');
		}
		socket.emit('message', msg);
	},

	add_candidtates: function (message) {
		console.log('got candidate');
		if (this.socket_id) {
			if (!this.peer) this.candidates.push(message);
			else this.peer.signal(message);
		} else {
			console.error('no robot');
		}
	},
};

//exports.pc = pc
//exports.ConnectStatus = ConnectStatus

export default exportData;
