/**
 * @fileOverview backbone Book model -- contains the chapter collections as attribute
 * @author Josh Bowling
 * @version 0.0.1
 */

var backbone, Book, Chapters, _;

_ = require('underscore');
backbone = require('backbone');

Chapters = require('../collections/Chapter');
Book = backbone.Model.extend({
    defaults: {
        name:'new Book',
        chapters: new Chapters()
    },
    idAttribute: 'name',
    /**
    * @param {string} name
    * @todo add chapters as array of chapters to fill the chapters collection
    */
    initialize: function (name) {
        var self;

        self = this;
        self.set('name', name);
        self.set('chapters', new Chapters());
        _.bindAll(self, 'addChapter');
        // pop the first chapter in there
        self.addChapter();
    },
    addChapter: function () {
        var self, chapter;

        self = this;     
        chapter = self.get('chapters').addChapter();
        return chapter;
    }
});

module.exports = Book;
