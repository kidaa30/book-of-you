/**
 * @fileOverview navigation for creating book, containing chapter navigation
 * @author Josh Bowling
 * @version 0.0.1
 */


var ko, subscriptions;

ko = require('../../bower/knockout/dist/knockout.js');
subscriptions = require('../collections/subscriptions');

ko.components.register('book-navigator', {
	viewModel: function(params) {
		var self;

		self = this;
		self.bookWorker = require('../observers/Book.js')().retrieve();

		// data declarations
		self.chapterNavigator = {};
		self.showMe = ko.observable(false);
		self.bookTitle = ko.observable('');
		self.hasBook = ko.pureComputed(function() {
			return self.book() != null;
		});
		self.book = ko.observable(null);
		self.chapters = ko.pureComputed(function() {
			// default result for initial pop
			var result = [];

			if(self.book() && self.book()['attributes']) {
				result = self.book().attributes.chapters().toJSON();
			}

			return result;
		});
		self.subHeading = ko.pureComputed(function() {
			return 'Chapter ' + bookWorker.retrieve().currentChapter();
		});
		self.createEnabled = ko.pureComputed(function() {
			var result;

			result = self.bookTitle() != '' && !self.hasBook();

			return result;
		});

		// subscriptions
		/**
		 a one time subscription at present
		 * @todo if book name changes are added, then then will need to  remove unsubscribe()
		*/
		self.onNameSet = self.bookWorker.subscriber(subscriptions.book.name.set, function(data, env) {
			self.showMe(true);
			self.onNameSet.unsubscribe();
		});

		// behaviors
		self.createBook = function(name) {
			var createSubscription;

			createSubscription = bookWorker.on(subscriptions.book.name.set, function(data, env) {
				var chapterSubscription;
				self.book(data.context);
				createSubscription.unsubscribe();
			});
			self.bookWorker.setName(self.bookTitle());
		};
		self.createChapter = function() {
			var result;
			
			result = self.bookWorker.addChapter();
			
			return result;
		};

	},
	template: { fromUrl: 'html/bookNavigator-1.html' }
});

module.exports = {};