/**
 * @fileOverview displays all verses as verse components in chapter
 * @author Josh Bowling
 * @version 0.0.1
 */

var ko, subscriptions, _;

ko = require('../../bower/knockout/dist/knockout.js');
_ = require('underscore');

subscriptions = require('../collections/subscriptions');

ko.components.register('verses', {
	viewModel: function(params) {
		var self, _onIncomingVerse, _onNameSet;

		self = this;
		self.bookWorker = require('../observers/Book.js')().retrieve();
		// data declarations
		self.verses = ko.observableArray();
		self.currentChapter = ko.observable(1);
		self.chapterHeading = ko.computed(function() { 
			return "Chapter " + self.currentChapter();
		});
		self.showMe = ko.observable(false);

		// subscriptions
		self.bookWorker.subscriber(subscriptions.book.chapters.chapter.set, function(data, env) {
			data.context = data.result.get('verses');
			self.currentChapter(data.result.get('num'));
			_onIncomingVerse(data, env);
		});
		self.bookWorker.subscriber(subscriptions.chapters.chapter.verse.crud.any.done, function(data, env) { 
			_onIncomingVerse(data, env);
		});
		self.onNameSet = self.bookWorker.subscriber(subscriptions.book.name.set, function(data, env) {
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
	},
	template: { fromUrl: 'html/verses-1.html'}
});

module.exports = {};