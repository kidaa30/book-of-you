var component;
component = function(ko) {
	ko.components.register('like-widget', {
		viewModel: function(params) {
			var self;
			self = this;
			// data declarations
			self.chosenValue = ko.observable(params.value);

			//behavior
			self.like = function() {
				self.chosenValue('like');
			}.bind(self);
			self.dislike = function() {
				self.chosenValue('dislike');
			}.bind(self);
		},
		template:
		'<div class="" data-bind="visible: !chosenValue()">\
			<button data-bind="click: like">Like It</button>\
			<button data-bind="click: dislike">Dislike It</button>\
		</div>\
		<div class="result" data-bind="visible: chosenValue">\
			You <strong data-bind="text:chosenValue"></strong> it\
		</div>'
	});
};

module.exports = component;