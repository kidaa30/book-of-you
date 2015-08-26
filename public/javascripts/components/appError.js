/**
 * @fileOverview component responsible for showing any error published throughout the app
 * @author Josh Bowling
 * @version 0.0.1
 */

var ko;

ko = require('../../bower/knockout/dist/knockout.js');

ko.components.register('app-error', {
	viewModel: function(params) {
		var self;

		self = this;
		self.bookWorker = require('../observers/Book.js')().retrieve();

		// subscriptions
		self.bookWorker.subscriber('#.error.#', function(data, env) {
			self.hasError(true);
		});

		// data declarations
		self.hasError = ko.observable(false);

		// behaviors
		self.clear = function() {
			self.hasError(false);
		}

	},
	template: { fromUrl: 'html/app-error-1.html'}
});
/** 
* @todo decide whether components and binding handlers should be exported as objects then bound to ko during initialization
*/
module.exports = {};