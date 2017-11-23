class Config {
constructor(env) {
    this.env = env;
	this.host = "localhost";
	this.port = 3000;
	
	this.db = {
		host:"localhost",
		port:1234,
		password:"test",
		database:"shout"
	};
  }
}

module.exports = ( env = null ) => { return new Config(env); }