var Product;
Product = function(name, rating) {
	var self;
	self = this;
	self.name = name || 'none';
	self.rating = rating || 0;
};

module.exports = Product;