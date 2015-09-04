var testData, resultData, _, should, Book;

_ = require('underscore');
should = require('should');
Book = require('../../javascripts/models/Book');

testData = require('../data/Book');

resultData = {
	verses: []
};

describe('Book Model Tests', function() {
	it('Initialize a Verse, check values from constructor invocation, re-set, check again', function() {
		var self, book, bookName, newBookName, chapters;
		self = this;
		newBookName = 'Song Book';
		Book.should.be.a.Function;
		book = new Book(testData.Book.name);
		book.should.be.an.Object;
		book.addChapter.should.be.a.Function();
		bookName = book.get('name');
		bookName.should.eql(testData.Book.name);
		// change the book name
		book.set('name', newBookName);
		bookName = book.get('name');
		bookName.should.eql(newBookName);
		chapters = book.get('chapters');
		chapters.should.be.okay;
		chapters.should.be.an.Object;
	});

	it('Add a chapter to a book', function() {
		var book, newChap, chapters;
		book = new Book();
		newChap = book.addChapter();
		newChap.should.be.okay;
		chapters = book.get('chapters');
		chapters.length.should.be.okay;
		chapters.length.should.eql(2);
	});
});
