var ko;

ko = require('../../bower/knockout/dist/knockout.js');

ko.components.register('chapters-navigator', {
	viewModel: { 
		createViewModel: function(params) {
			var self, _selectedChapter;
			// will be used to push data to/fro computed value
			_selectedChapter = 0;
			self = this;
			self.bookWorker = require('../observers/Book.js')().retrieve();
			self.navigateChapters = ko.observableArray(self.bookWorker.attributes.chapters().toJSON());
			self.bookWorker.subscriber('chapters.crud.create.done', function(data, env) {
				console.log(arguments);
				if(data.context) {
					self.navigateChapters(data.context.toJSON());
				}
			});

			// data declarations

			self.selectedChapter = self.bookWorker.currentChapter;
			self.setSelectedChapter = function(data) {
				self.selectedChapter(data.num);
			};

			return self;
		}
	},
	template: { fromUrl: 'html/chaptersNavigator-1.html'}
});

module.exports = {};