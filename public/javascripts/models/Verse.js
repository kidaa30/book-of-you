/**
 * @fileOverview backbone Verse model, contained in Chapter model
 * @author Josh Bowling
 * @version 0.0.1
 */


var VerseModel, backbone;

backbone = require('backbone');

VerseModel = backbone.Model.extend({
	defaults: {
		num:0,
		text:'new verse'
	},
	initialize: function(num, text) {
		var self = this;
		
		self.set('num', num);
		self.set('text', text);
	}
});

module.exports = VerseModel;