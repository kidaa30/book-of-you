
/**
 * @fileOverview displays an individual verse
 * @author Josh Bowling
 * @version 0.0.1
 */

var ko;

ko = require('../../bower/knockout/dist/knockout.js');
ko.components.register('bookOutput', {
	viewModel: function(params) {
		var self;
		self = this;
		// data declarations
		self.text = params.text;
		self.num = params.num;
	},
	template: { fromUrl: 'html/book-output-1.html'}
});

module.exports = {};