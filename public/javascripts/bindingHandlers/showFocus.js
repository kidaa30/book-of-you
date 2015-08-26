/**
 * @fileOverview callback when focus is gained/lost on the element
 * @author Josh Bowling
 * @version 0.0.1
 */

showFocus = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        var callback, $element, allBindings, target;
        allBindings = allBindingsAccessor();
        $element = $(element);
        $element.focusin(function (event) {
                allBindings.showFocus.call(viewModel, true);
                $element.focusout(function() {
                    allBindings.showFocus.call(viewModel, false);
                })
                return true;
        });
    }
};

module.exports = showFocus;