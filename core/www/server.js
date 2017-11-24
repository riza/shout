class HTTP {
	constructor(config) {

		this.express = require('express');	
		this.app = this.express();
		this.http = require('http').Server(this.app);
		this.hbs  = require('hbs');
		

		this.hbs.registerPartials(__dirname + '/views/partials');

		this.app.use(this.express.static(__dirname + '/public'));
		this.app.set('view engine', 'hbs');
		this.app.set('views', __dirname + '/views');


		this.app.use('/vendor/bootstrap/js', this.express.static(__dirname + '../../../node_modules/bootstrap/dist/js'));
		this.app.use('/vendor/bootstrap/js', this.express.static(__dirname + '../../../node_modules/jquery/dist')); 
		this.app.use('/vendor/bootstrap/css', this.express.static(__dirname + '../../../node_modules/bootstrap/dist/css')); 
		this.app.use('/vendor/jquery', this.express.static(__dirname + '../../../node_modules/jquery/dist'));
		this.app.use('/vendor/socket.io', this.express.static(__dirname + '../../../node_modules/socket.io-client/dist'));



		this.app.set('partialsDir')
		this.app.get('/', (req, res) => res.render('index'));
		// this.app.listen(config.port, () => console.log(`(INFO) HTTP Server Runnning on ${config.port}`));
		this.http.listen(config.port, () => console.log(`(INFO) HTTP Server Runnning on ${config.port}`));
		return this.http;
	}
}

module.exports = ( config ) => { return new HTTP(config); }