var testData, resultData, _;

_ = require('underscore');

testData = require('../data/Book');
resultData = {
	verses: []
};

describe('Book Model Tests', function() {
	beforeAll(function() {
		var self;

		self = this;
		
	});
	beforeEach(function() {
		var self, Verse;

		self = this;
		self.Book = require('../../javascripts/models/Book');
		self.testDataAbstraction = testData;

	});
	it('Initialize a Verse, check values from constructor invocation, re-set, check again', function() {
		var self, book;

		self = this;
		expect(typeof self.Book).toBe('function');
//		book = new self.Book(self.testDataAbstraction.name);
//		console.log(book);
	});

	// tear it down
	afterAll(function () {

	});

});
