/**
 * @fileOverview Backbone Book collection
 * @author Josh Bowling
 * @version 0.0.1
 **/

var Book, _, $, backbone, BookModel;

_ = require('underscore');
backbone = require('backbone');
BookModel = require('../models/Book.js');
backbone.localstorage = require('backbone.localstorage');
Book = backbone.Collection.extend({
	model: BookModel,
	localStorage: new backbone.localstorage('bookofyou'),
	initialize: function() {
		var self;
		self = this;
		self.fetch(
			{
				success: function(book) {
					self.add(book);
				}, error: function() {
					self.add(new self.model());
				}
			}
		);
	}
});

module.exports = Book;