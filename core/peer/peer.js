class Peer {
	constructor(http) {
		http.on('connection', function(id) { 
			console.log('P2P Connection ok');
		 });
	}
}

module.exports = (http) => { return new Peer(http); }