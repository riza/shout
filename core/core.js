
class Core {
	
	constructor(env) {

		this.CFonts = require('cfonts');
		this.CFonts.say('Shout!', {
			font: 'block',        
			align: 'left',       
			colors: ['red','yellow'],   
			background: 'Black', 
			letterSpacing: 1,    
			lineHeight: 1,       
			space: true,         
			maxLength: '0'       
		});

		console.log(`[*] Shout starting in ${env} env`);

		this.config = require('../config/config.js')(env);
		this.http   = require('./www/server.js')(this.config,this.colors);
		this.peer   = require('./peer/peer.js')(this.http,this.colors);
		this.socket = require('./socket/socket.js')(this.http,this.colors);
		
	}

}

module.exports = ( env ) => { return new Core( env ); }