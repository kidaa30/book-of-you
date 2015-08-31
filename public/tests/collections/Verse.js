var testData, resultData, _;

testData = require('../data/Verse.js');

resultData = {
	verses: []
};

describe('Verse Collection Tests', function() {
	beforeAll(function() {
		var self;

		self = this;
		
	});
	beforeEach(function() {
		var self, Verse;

		self = this;
		self.Verses = require('../../javascripts/collections/Verse');
		self.testDataAbstraction = testData;

	});
	it('Initialize a Verse, check values from constructor invocation, re-set, check again', function() {
		var self, book;

		self = this;
		expect(typeof self.Verses).toBe('function');
	});

	// tear it down
	afterAll(function () {

	});

});
