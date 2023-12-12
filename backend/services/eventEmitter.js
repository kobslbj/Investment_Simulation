// eventEmitter.js
const EventEmitter = require('events');
class MatchEmitter extends EventEmitter {}
const matchEmitter = new MatchEmitter();

module.exports = matchEmitter;
