var testData, resultData, _, should;

_ = require('underscore');
should = require('should');

testData = require('../data/Book');
resultData = {
	verses: []
};

describe('Book Model Tests', function() {
	it('Initialize a Verse, check values from constructor invocation, re-set, check again', function() {
		var self, book;
		self = this;
		self.Book = require('../../javascripts/models/Book');
		self.Book.should.be.a.Function;
		book = new self.Book(testData.name);
		book.should.be.an.Object;
	});


});
