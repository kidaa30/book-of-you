/**
 * @fileOverview Backbone Book collection
 * @author Josh Bowling
 * @version 0.0.1
 */

var Book, _, $, backbone, BookModel;

_ = require('underscore');
backbone = require('backbone');
BookModel = require('../models/Book.js');
console.log('bmodel',BookModel);
backbone.localstorage = require('backbone.localstorage');
Book = backbone.Collection.extend({
	model: BookModel,
	localStorage: new backbone.localstorage('bookofyou'),
	initialize: function() {
		var self;
		
		self = this;
		self.fetch(
			{
				success: function() {
					console.log('succes', arguments);
					console.log(self.first().get('name'));
				}, error: function() {
					console.log('error', arguments);
				}
			}
		);
	}
});

module.exports = Book;