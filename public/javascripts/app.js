/**
 * @fileOverview requires base components, and initializes application
 * @author Josh Bowling
 * @version 0.0.1
 */

var $, backbone, ko;

$ = window.$ = require('../bower/jquery/dist/jquery.js');
ko = require('../bower/knockout/dist/knockout.js');
backbone = require('backbone');
// set the backbone jQuery value
backbone.$ = $;

// require all knockout components
require('./components/appError');
require('./components/verses');
require('./components/verse');
require('./components/bookNavigator');
require('./components/chaptersNavigator');
require('./components/versesInput');

// require all binding handlers
ko.bindingHandlers.enterKey = require('./bindingHandlers/enterKey.js');
ko.bindingHandlers.showFocus = require('./bindingHandlers/showFocus.js');
require('./components/customLoader.js');

// run setup
(function ($) {
    var $d, init, AppViewModel;
    $d = $(document);
    AppViewModel = function() {
        var self;
        self = this;
        self.$ = $;
    };
    init = function () {
        var appViewModel;
        appViewModel = new AppViewModel();
        ko.applyBindings(appViewModel);
    };
    $d.ready(init);
})($);
