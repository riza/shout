
class Socket {
	constructor(http) {
		this.socket = require('socket.io')(http);
		
		this.socket.on('connection', function(socket){
			console.log('a user connected');
		});

	}
}

module.exports = (http) => { return new Socket(http); }