/**
 * @fileOverview backbone verse collection
 * @author Josh Bowling
 * @version 0.0.1
 */

var Verse, backbone, _, VerseModel;

_ = require('underscore');

backbone = require('backbone');

VerseModel = require('../models/Verse');

Verse = backbone.Collection.extend({
	model: VerseModel,
	initialize: function(channel) {
		var self = this;

		self.channel = channel;
		_.bindAll(self, 'addVerse');
	},
	addVerse: function(verseText) {
		var self, verse;

		self = this;
		verse = new self.model(self.models.length + 1, verseText);
 		self.add(verse);
		return verse;
	}
});

module.exports = Verse;