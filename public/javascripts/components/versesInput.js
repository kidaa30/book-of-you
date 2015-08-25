var ko;

ko = require('../../bower/knockout/dist/knockout.js');

ko.components.register('verses-input', {
	viewModel: function(params) {
			var self, _fullText, _onNameSet;
			self = this;
			// data declarations
			self.newVerse = ko.observable('');
			self.bookWorker = require('../observers/Book.js')().retrieve();
			self.currentChapter = self.bookWorker.currentChapter;
			self.hasChapter = ko.pureComputed(function() {
				return self.currentChapter() > 0;
			});
			self.showMe = ko.observable(false);
			self.writingVerse = ko.observable(false);
			// subscriptions
			self.bookWorker.subscriber('chapters.chapter.verse.crud.create.done', function(data, env) {
				self.newVerse = ko.observable('test');
			});
			self.onNameSet = self.bookWorker.subscriber('book.name.set', function(data, env) {
				_onNameSet(data, env);
			});

			// behaviors
			self.addVerse = function(viewModel, val, target) {
				self.bookWorker.addVerse(val);
			};
			// internal
			_onNameSet = function(data, env) {
				self.showMe(true);
				self.onNameSet.unsubscribe();
			};

			return self;
	},
	template: { fromUrl: 'html/verseInput-1.html'}
});

module.exports = {};