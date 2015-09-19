/**
 * @fileOverview navigation for creating and selecting chapters
 * @author Josh Bowling
 * @version 0.0.1
 */


var ko, subscriptions;

ko = require('../../bower/knockout/dist/knockout.js');
subscriptions = require('../collections/subscriptions');

ko.components.register('chapters-navigator', {
	viewModel: { 
		createViewModel: function(params) {
			var self;
			// will be used to push data to/fro computed value
			self = this;
			self.bookWorker = require('../observers/Book.js')().retrieve();

			// data declarations
			self.navigateChapters = ko.observableArray(self.bookWorker.attributes.chapters().toJSON());
			self.selectedChapter = self.bookWorker.currentChapter;

			// behaviors
			self.setSelectedChapter = function(data) {
				self.selectedChapter(data.num);
			};

			// subscriptions
			self.bookWorker.subscriber(subscriptions.book.chapters.crud.create.done, function(data, env) {
				console.log(self.bookWorker.currentChapterNum());
				if(data.context) {
					self.navigateChapters(data.context.toJSON());
				}
			});

			return self;
		}
	},
	template: { fromUrl: 'html/chaptersNavigator-1.html'}
});

module.exports = {};