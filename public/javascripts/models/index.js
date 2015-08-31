// wrapped in the event I need to pre-process
var models;
models = {
	Book: require('./Book.js'),
	Chapter: require('./Chapter.js'),
	Verse: require('./Verse.js')
};

module.exports = models;