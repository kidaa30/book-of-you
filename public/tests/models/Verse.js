var testData, resultData, _;

_ = require('underscore');

testData = require('../data/Verse');
resultData = {
	verses: []
};

describe('Verse Model Tests', function() {
	beforeEach(function() {
		var self, Verse;

		self = this;
		self.Verse = require('../../javascripts/models/Verse.js');
		self.testDataAbstraction = testData;

	});
	it('Initialize a Verse, check values from constructor invocation, re-set, check again', function() {
		var self, verseIsFunction, verse, textChange;

		self = this;
		// is Verse a function
		verseIsFunction = typeof self.Verse == 'function';
		expect(verseIsFunction).toBeTruthy();
		textChange = self.testDataAbstraction.verses.a.text + ' and some material upon which light is reflected and absorbed to manifest visuall and physically';
		// test constructor
		verse = new self.Verse(self.testDataAbstraction.verses.a.num, self.testDataAbstraction.verses.a.text);
		expect(verse.get).toBeDefined();
		expect(verse.set).toBeDefined();
		// values are as set in constructor
		expect(verse.get('num')).toEqual(self.testDataAbstraction.verses.a.num);
		expect(verse.get('text')).toEqual(self.testDataAbstraction.verses.a.text);
		// probably unnecessary regressive backbone testing applying specifically to this model's attributes
		verse.set('num', 3);
		expect(verse.get('num')).toEqual(3);
		verse.set({num: 1, text: textChange});
		expect(verse.get('num')).toEqual(1);
		expect(verse.get('text')).toEqual(textChange);
		resultData.verses.push(verse);
	});

	// tear it down
	afterAll(function () {
		_.each(resultData.verses, function(verse, versei) {
			verse.destroy();
		});

	});

});
