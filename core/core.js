
class Core {
	
	constructor(env) {
		this.config = require('../config/config.js')(env);
		this.http   = require('./www/server.js')(this.config);
		this.p2p    = require('./p2p/p2p.js')(this.config);
		this.fs     = require('fs');
		// register all services
	}

}

module.exports = ( env ) => { return new Core( env ); }