
/**
 * @fileOverview displays an individual verse
 * @author Josh Bowling
 * @version 0.0.1
 */

var ko, subscriptions;

ko = require('../../bower/knockout/dist/knockout.js');
subscriptions = require('../collections/subscriptions');
ko.components.register('book-output', {
	viewModel: function(params) {
		var self;
		console.log('bo');

		self = this;
		self.bookWorker = require('../observers/Book.js')().retrieve();
		self.bookJson = ko.observable();
		self.bookWorker.subscriber(subscriptions.book.crud.any, function(data, env) {
			self.bookJson(data.result);			
		})

	},
	template: { fromUrl: 'html/book-output-1.html'}
});

module.exports = {};