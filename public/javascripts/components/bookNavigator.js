/**
 * @fileOverview navigation for creating book, containing chapter navigation
 * @author Josh Bowling
 * @version 0.0.1
 */


var ko;

ko = require('../../bower/knockout/dist/knockout.js');

ko.components.register('book-navigator', {
	viewModel: function(params) {
		var self, _subscriptions;

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
		// experiment to hold subscription strings, handlers, subscription object, and data
		/** 
		* @todo resolve subscription containment issue
		*/
		_subscriptions = {
			chapters: {
				id: 'chapter.crud.#',
				handler: function(data, env) {
				},
				subscription: null,
				data:null
			}
		};
		/**
		 a one time subscription at present
		 * @todo if book name changes are added, then then will need to  remove unsubscribe()
		*/
		self.onNameSet = self.bookWorker.subscriber('book.name.set', function(data, env) {
			self.showMe(true);
			self.onNameSet.unsubscribe();
		});

		// behaviors
		self.createBook = function(name) {
			var createSubscription;

			createSubscription = bookWorker.on('book.name.set', function(data, env) {
				createSubscription.unsubscribe();
				self.book(data.context);
				_subscriptions.chapters.subscription = 
					self.bookWorker.subscriber(_subscriptions.chapters.id, _subscriptions.chapters.handler);
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