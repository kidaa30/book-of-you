var testData, resultData, _;

_ = require('underscore');

testData = require('../data/Chapter1');
resultData = {
	verses: []
};

describe('Verse Chapters Tests', function() {
	beforeAll(function() {
		var self;

		self = this;
		
	});
	beforeEach(function() {
		var self, Verse;

		self = this;
		self.Chapter = require('../../javascripts/models/Chapter');
		self.testDataAbstraction = testData;

	});
	it('Initialize a Verse, check values from constructor invocation, re-set, check again', function() {
		var self, chapterIsFunction, chapter, verseLen, verses, findVerse;

		self = this;
		verseLen = testData.Chapter.verses.length;
		expect(typeof self.Chapter).toEqual('function');
		chapter = new self.Chapter(testData.Chapter.num, testData.Chapter.verses);
		findVerse = {num: verseLen-1};
		findVerse.text = testData.Chapter.verses[findVerse.num];
		verses = chapter.get('verses');
		expect(typeof chapter.get).toEqual('function');
		expect(typeof chapter.set).toEqual('function');
		verses = chapter.get('verses');
		expect(typeof verses).toEqual('object');
		expect(verses.length).toEqual(verseLen);
		expect(verses.get(findVerse.num).get('text')).toEqual(findVerse.text);
	});

	// tear it down
	afterAll(function () {

	});

});
