var ko, _;

ko = require('../../bower/knockout/dist/knockout.js');

_ = require('underscore');

ko.components.register('verses', {
	viewModel: function(params) {
		var self, _verses, _onIncomingVerse, _onNameSet;

		self = this;
		self.bookWorker = require('../observers/Book.js')().retrieve();
		verses = [];
		self.verses = ko.observableArray();
		self.currentChapter = ko.observable(1);
		self.chapterHeading = ko.computed(function() { 
			return "Chapter " + self.currentChapter();
		});
		self.showMe = ko.observable(false);
		// subscriptions
		self.bookWorker.subscriber('chapters.chapter.set', function(data, env) {
			data.context = data.result.get('verses');
			self.currentChapter(data.result.get('num'));
			_onIncomingVerse(data, env);
		});
		self.bookWorker.subscriber('chapters.chapter.verse.crud.*.done', function(data, env) { 
			_onIncomingVerse(data, env);
		});
		self.onNameSet = self.bookWorker.subscriber('book.name.set', function(data, env) {
			_onNameSet(data, env);
		});
		// behaviors
		// internal
		_onIncomingVerse = function(data, env) {
			var verseData;
			verseData = data.context.toJSON();
			self.verses(verseData);
		};
		_onNameSet = function(data, env) {
			self.showMe(true);
			self.onNameSet.unsubscribe();
		};
		//external
	},
	template: { fromUrl: 'html/verses-1.html'}
});

module.exports = {};