class Peer {
	constructor(http) {
		http.on('connection', function(id) { 

		});
	}
}

module.exports = (http) => { return new Peer(http); }