/**
 * @fileOverview backbone verse collection
 * @author Josh Bowling
 * @version 0.0.1
 */

var Verse, backbone, _, VerseModel;

_ = require('underscore');

backbone = require('backbone');

VerseModel = require('../models/').Verse;

Verse = backbone.Collection.extend({
	model: VerseModel,
	initialize: function(verses) {
		var self = this;

		_.bindAll(self, 'addVerse', 'addVerses');
		self.addVerses(verses);
	},
	addVerse: function(verseText, num) {
		var self, verse;

		self = this;
		if(!_.isNumber(num)) {
			num = self.models.length + 1;
		}
		verse = new self.model(num, verseText);
 		self.add(verse);
		return verse;
	},
	addVerses: function(verses) {
		var self, _addVerse;

		self = this;
		_addVerse = function(verse, versei) {
		 	self.addVerse(verse, versei);
		};
		// if its just a string invoke addVerse
		if(_.isString(verses)) {
			self.addVerse(verses);
			return true;
		} 
		// if this isn't an array then ignore
		if(!_.isArray(verses) || _.isEmpty(verses)) {
			return false;
		}
		// add them individually so we can check each of them
		_.each(verses, _addVerse);
		return true;
	}

});

module.exports = Verse;