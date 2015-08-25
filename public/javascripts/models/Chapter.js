var _, ChapterModel, backbone, VerseCollection;

_ = require('underscore');

backbone = require('backbone');

VerseCollection = require('../collections/Verse');

ChapterModel = backbone.Model.extend({
	defaults: {
		num:0,
		verses: new VerseCollection()
	},
	initialize: function(num, verseCollection) {
		var self;
		self = this;
		self.set('num', num);
		if(_.isObject(verseCollection) && _.isFunction(verseCollection['add'])) {
			self.set('verses', verseCollection);
		} else {
			self.set('verses', new VerseCollection());
		}
	},
	addVerse: function(verseText) {
		var self, verse;
		self = this;
		verse = self.get('verses').addVerse(verseText);
		return verse;
	}

});

module.exports = ChapterModel;