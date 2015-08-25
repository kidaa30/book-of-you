var backbone, Book, Chapters, _;

_ = require('underscore');

backbone = require('backbone');

Chapters = require('../collections/Chapter');

Book = backbone.Model.extend({
    defaults: {
        name:'new Book',
        chapters: new Chapters()
    },
    initialize: function (name, chapters) {
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
