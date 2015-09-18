/**
 * @fileOverview component for authoring verses into a chapter
 * @author Josh Bowling
 * @version 0.0.1
 */

var ko, subscriptions;

ko = require('../../bower/knockout/dist/knockout.js');
subscriptions = require('../collections/subscriptions');

ko.components.register('verses-input', {
	viewModel: function(params) {
		var self;

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
		self.bookWorker.subscriber(subscriptions.book.chapters.chapter.verse.crud.create.done, function(data, env) {
			self.newVerse = ko.observable('test');
		});
		self.onNameSet = self.bookWorker.subscriber(subscriptions.book.name.set, function(data, env) {
			self.showMe(true);
			self.onNameSet.unsubscribe();
		});

		// behaviors
		self.addVerse = function(viewModel, val, target) {
			self.bookWorker.addVerse(val);
		};

		return self;
	},
	template: { fromUrl: 'html/verseInput-1.html'}
});

module.exports = {};