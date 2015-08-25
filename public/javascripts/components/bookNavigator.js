var ko;

ko = require('../../bower/knockout/dist/knockout.js');

ko.components.register('book-navigator', {
	viewModel: function(params) {
		var self, bookCreator, _subscriptions, _onNameSet;
		self = this;
		self.chapterNavigator = {};
		bookWorker = params.bookWorker();
		self.bookWorker = bookWorker.retrieve();
		// data declarations
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
		// to hold subscription strings, handlers, subscription object, and data
		_subscriptions = {
			chapters: {
				id: 'chapter.crud.#',
				handler: function(data, env) {
				},
				subscription: null,
				data:null
			}
		};
		self.onNameSet = self.bookWorker.subscriber('book.name.set', function(data, env) {
			_onNameSet(data, env);
		});

		//computed values
		self.createEnabled = ko.pureComputed(function() {
			var result;
			result = self.bookTitle() != '' && !self.hasBook();
			return result;
		});
		// behaviors
		self.createBook = function(name) {
			var createSubscription = bookWorker.on('book.name.set', function(data, env) {
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
		// internal
		_onNameSet = function(data, env) {
			self.showMe(true);
			self.onNameSet.unsubscribe();
		};


		//dispose
		self.dispose = function() {
			self.book.del();
		};
	},
	template: { fromUrl: 'html/bookNavigator-1.html' }
});

module.exports = {};