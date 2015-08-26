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
		/**
		* @todo make num conditional if there's a collection bound to model because we could get chapter num by use of collecciton length 
		*/
		self.set('num', num);
		// conditionally set the verses value
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