class HTTP {
	constructor(config) {

		this.express = require('express');	
		this.app = this.express();
		this.http = require('http').Server(this.app);
		this.hbs  = require('hbs');
		this.peer = require('peer').ExpressPeerServer;

		this.hbs.registerPartials(__dirname + '/views/partials');

		this.app.use(this.express.static(__dirname + '/public'));
		this.app.set('view engine', 'hbs');
		this.app.set('views', __dirname + '/views');

		// P2P Options

		this.options = {
			debug: (config.env == 'dev') ? true : false,
			allow_discovery: true
		}
		
		const traversal = (config.env == 'prod') ? '/../../' : '../../../';

		this.app.use('/vendor/bootstrap/js', this.express.static(__dirname + traversal +'node_modules/bootstrap/dist/js'));
		this.app.use('/vendor/bootstrap/js', this.express.static(__dirname + traversal +'node_modules/jquery/dist')); 
		this.app.use('/vendor/bootstrap/css', this.express.static(__dirname + traversal +'node_modules/bootstrap/dist/css')); 
		this.app.use('/vendor/jquery', this.express.static(__dirname + traversal +'node_modules/jquery/dist'));
		this.app.use('/vendor/socket.io', this.express.static(__dirname + traversal +'node_modules/socket.io-client/dist'));

		this.app.use('/peerjs', this.peer(this.http, this.options));

		this.app.set('partialsDir')
		this.app.get('/', (req, res) => res.render('index'));
		
		this.app.get('/peers',() => {

		});


		this.http.listen(config.port, () => console.log(`[!] HTTP Server Runnning on ${config.port}`));

		return this.http;
	}
}

module.exports = ( config ) => { return new HTTP(config); }