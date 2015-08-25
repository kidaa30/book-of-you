
showFocus = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        var callback, $element, allBindings, target;
        allBindings = allBindingsAccessor();
        $element = $(element);
        $element.focusin(function (event) {
                allBindings.showFocus.call(viewModel, true);
                // a hack for whatever reason, the observable isn't blanking this value out
                $element.focusout(function() {
                    allBindings.showFocus.call(viewModel, false);
                })
                return true;
        });
    }
};

module.exports = showFocus;