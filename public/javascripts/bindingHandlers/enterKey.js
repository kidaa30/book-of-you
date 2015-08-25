
enterKey = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        var callback, $element, allBindings, target;
        allBindings = allBindingsAccessor();
        $element = $(element);
        $element.keypress(function (event) {
            var keyCode = (event.which ? event.which : event.keyCode);
            target = event.target;
            if (keyCode === 13) {
                allBindings.enterKey.call(viewModel, viewModel, $element.val(), target);
                // a hack for whatever reason, the observable isn't blanking this value out
                $element.val('');
                return false;
            }
            return true;
        });
    }
};

module.exports = enterKey;