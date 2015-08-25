var ko;

ko = require('../../bower/knockout/dist/knockout.js');

ko.components.register('verse', {
	viewModel: function(params) {
		var self;
		self = this;
		// data declarations
		self.text = params.text;
		self.num = params.num;
	},
	template: { fromUrl: 'html/verse-1.html'}
});

module.exports = {};