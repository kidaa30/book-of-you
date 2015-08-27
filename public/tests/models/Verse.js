var Jasmine, jasmine;
Jasmine = require('../../bower/jasmine/lib/jasmine-core.js');
console.log(Jasmine);
module.exports = function() {
	describe('Verse Model Tests', function() {
		var testData;
		testData = {};
		test('Initialize', function() {
			var Verse;
			Verse = require('../../javascripts/models/Verse.js');
			expect(Verse).toBeFunction();
		});
	});
}