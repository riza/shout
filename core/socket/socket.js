
class Socket {
	constructor(http) {
		this.socket = require('socket.io')(http);
		
		this.socket.on('connection', function(socket){
			socket.on('peers', (msg) => {
				socket.emit('peers', msg);
				console.log(msg);
			});
		});


	}
}

module.exports = (http) => { return new Socket(http); }