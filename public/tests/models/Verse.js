describe('Verse Model Tests', function() {
	var testData;
	testData = {
		verses: {
			a: {
				num:1,
				text: 'In the beginning'
			},
			b: {
				num: 2,
				text: 'In the end'
			}
		}
	};
	beforeEach(function() {
		var self, Verse;

		self = this;
		self.Verse = require('../../javascripts/models/Verse.js');
		self.testDataAbstraction = testData;

	});
	it('Initialize a Verse, check values from constructor invocation, re-set, check again', function() {
		var self, verseIsFunction, verse;

		self = this;
		// is Verse a function
		verseIsFunction = typeof self.Verse == 'function';
		expect(verseIsFunction).toBeTruthy();
		// test constructor
		verse = new self.Verse(self.testDataAbstraction.verses.a.num, self.testDataAbstraction.verses.a.text);
		expect(verse.get).toBeDefined();
		expect(verse.set).toBeDefined();
		// values are as set in constructor
		expect(verse.get('num')).toEqual(self.testDataAbstraction.verses.a.num);
		expect(verse.get('text')).toEqual(self.testDataAbstraction.verses.a.text);
		verse.set('num', 3);
		expect(verse.get('num')).toEqual(3);
	});
});