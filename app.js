
/*
* Shout v1.0 beta 
* @Author: Riza Sabuncu <github.com/riza>
*
* 
* You can switch env to `prod` or `dev`
* npm start dev
* npm start prod
*/

const args = require('yargs').argv;
const env  = (args._[0]) ? args._ : 'prod';
const Core = require('./core/core.js')(env);