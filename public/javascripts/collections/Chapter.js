/**
 * @fileOverview Backbone chapter collection
 * @author Josh Bowling
 * @version 0.0.1
 */

var Chapter, _, backbone, ChapterModel, VerseCollection;

_ = require('underscore');

backbone = require('backbone');

ChapterModel = require('../models/Chapter.js');

Chapter = backbone.Collection.extend({
	model: ChapterModel,
	initialize: function() {
		var self;
		
		self = this;
		_.bindAll(self, 'addChapter');
	},
	addChapter: function() {
		var self, chapNum, chap;

		self = this;
		chapNum = self.models.length + 1;
		chap = new self.model(chapNum);
		self.add(chap);
		return chap;
	}
});

module.exports = Chapter;