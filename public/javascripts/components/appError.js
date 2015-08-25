var ko;

ko = require('../../bower/knockout/dist/knockout.js');

ko.components.register('app-error', {
	viewModel: function(params) {
		var self;
		self = this;
		self.bookWorker = require('../observers/Book.js')().retrieve();
		
		// subscriptions
		self.bookWorker.subscriber('#.error.#', function(data, env) {
			console.log(data);
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

module.exports = {};