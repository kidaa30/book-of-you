var models;
models = function () {
    var Book, book, Chapters, Verses, Verse;
    Verse = Backbone.Model.extend({

    });
    
    Verses = Backbone.Collection.extend({
        model: Verse,
        addVerse: function (text) {
            var self = this;
            var num = self.models.length;
            var result = new self.model({ text: text, number: num });
            self.add(result);
            return result;
        },
        addVerses: function (texts) {
            var self = this;
            if (!_.isArray(texts)) {
            } else {
                texts = [texts];
            }
            _.each(texts, function (text, texti) {
                self.addVerse(text, self.models.length);
            });

        }
    });
    
    Chapters = Backbone.Collection.extend({
        model: Backbone.Model.extend({}),
        initialize: function (opts) {
            var self = this;
            _.bindAll(this, 'addChapter')
        },
        addChapter: function (num) {
            var self = this;
            var result = new self.model({ number: num, verses: new Verses() });
            self.add(result);
            return result;
        }
    });
    
    Book = Backbone.Model.extend({
        initialize: function (opts) {
            var self = this;
            var chapters = self.set('chapters', new Chapters());
            _.bindAll(this, 'addChapter');
        },
        addChapter: function () {
            var self = this;
            return self.get('chapters').addChapter(self.get('chapters').models.length + 1);
        }
    });
    
    book = new Book({ name: bookData.name });
    
    _.each(bookData.chapters, function (v, i) {
        var chapter = book.addChapter(v);
        _.each(v.verses, function (verse, versei) {
            chapter.get('verses').addVerse(verse);
        });
    });

    return book;
};
model.exports = models;