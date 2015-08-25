
var enterKey, $, backbone, ko, async;

$ = window.$ = require('../bower/jquery/dist/jquery.js');
ko = require('../bower/knockout/dist/knockout.js');
require('./components/appError');
require('./components/verses');
require('./components/verse');
require('./components/bookNavigator');
require('./components/chaptersNavigator');
require('./components/versesInput');
backbone = require('backbone');
backbone.$ = $;
async = require('async');

// require('../bower/bootstrap/dist/js/bootstrap.min.js');
ko.bindingHandlers.enterKey = require('./bindingHandlers/enterKey.js');
ko.bindingHandlers.showFocus = require('./bindingHandlers/showFocus.js');
require('./components/customLoader.js');
// this would be abstracted by monologue
(function ($) {
    var $d, init, AppViewModel;
    $d = $(document);
    AppViewModel = function() {
        var self, bookWorker;
        self = this;
        self.bookWorker = require('./observers/Book');
        bookWorker = self.bookWorker().retrieve();
        bookWorker.subscriber('#error', function(data, env) {
            console.log('error', arguments);
        });
    };
    init = function () {
        var appViewModel;
        appViewModel = new AppViewModel();
        ko.applyBindings(appViewModel);
    };
    $d.ready(init);
})($);
