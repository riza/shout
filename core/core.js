
class Core {
	
	constructor(env) {
		this.config = require('../config/config.js')(env);
		this.http   = require('./www/server.js')(this.config);
		this.socket  = require('./socket/socket.js')(this.http);
		this.fs     = require('fs');
		// register all services
	}

}

module.exports = ( env ) => { return new Core( env ); }