/**
 * @fileOverview binding handler for enterkey to pass value from input back to callback
 * @author Josh Bowling
 * @version 0.0.1
 */

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
                // a hack for whatever reason, the observable isn't clearing this value out
                /**
                * @todo -- investigate why the observable isn't clearing
                */
                $element.val('');
                return false;
            }
            return true;
        });
    }
};

module.exports = enterKey;