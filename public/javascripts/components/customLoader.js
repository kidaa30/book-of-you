/**
 * @fileOverview taken from knockout site for implementing ajax-loading functionality for templates
 * @author Josh Bowling
 * @version 0.0.1
 */

var ko, templateFromUrlLoader;

ko = require('../../bower/knockout/dist/knockout.js');

templateFromUrlLoader = {
    loadTemplate: function(name, templateConfig, callback) {
        if (templateConfig.fromUrl) {
            // Uses jQuery's ajax facility to load the markup from a file
            var fullUrl = templateConfig.fromUrl;
            $.get(fullUrl, function(markupString) {
                // We need an array of DOM nodes, not a string.
                // We can use the default loader to convert to the
                // required format.
                ko.components.defaultLoader.loadTemplate(name, markupString, callback);
            });
        } else {
            // Unrecognized config format. Let another loader handle it.
            callback(null);
        }
    }
};

// Register it
ko.components.loaders.unshift(templateFromUrlLoader);

module.exports = {};