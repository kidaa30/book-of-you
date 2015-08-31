/**
 * @fileOverview backbone Chapter model -- contains the verse collections as attribute
 * @author Josh Bowling
 * @version 0.0.1
 */

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
		_.bindAll(self, 'addVerse');
		/**
		* @todo make num conditional if there's a collection bound to model because we could get chapter num by use of collecciton length 
		*/
		self.set('num', num);
		self.set('verses', new VerseCollection());
		self.get('verses').addVerses(verseCollection);
		// conditionally set the verses value

	},
	addVerse: function(verseText) {
		var self, verse;

		self = this;
		verse = self.get('verses').addVerse(verseText);

		return verse;
	}

});

module.exports = ChapterModel;