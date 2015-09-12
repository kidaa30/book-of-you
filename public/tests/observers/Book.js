var backbone, ChapterCollection, ChapterModel, Response, should, _;

should = require('should');

_ = require('underscore');

Response = require('../../javascripts/utility/ResponseObject');

ChapterCollection = require('../../javascripts/collections/Chapter');

ChapterModel = require('../../javascripts/models/Chapter');

backbone = require('backbone');

describe('Test The Book Observer', function() {
	it('create the book observer', function() {
		var BookObserver, bookObserver;

		BookObserver = require('../../javascripts/observers/Book');
		BookObserver.should.be.okay;
		BookObserver.should.be.a.Function;
		bookObserver = BookObserver();
		bookObserver.should.be.okay;
		bookObserver.should.be.an.Object;
	});
	it('verify the composition of a book observer', function() {
		var BookObserver, bookObserver, pubSub, worker;

		BookObserver = require('../../javascripts/observers/Book');
		bookObserver = BookObserver();
		bookObserver.should.have.property('create');
		pubSub = bookObserver.create();
		pubSub.should.be.okay;
		pubSub.should.be.an.Object;
		pubSub.should.have.property('workerFunctions');
		worker = pubSub.workerFunctions;
		worker.should.be.okay;
		worker.should.be.an.Object;
		worker.should.have.property('delete');
		worker.should.have.property('addChapter');
		worker.should.have.property('setCurrentChapter');
		worker.should.have.property('setName');
		worker.should.have.property('addVerse');
		worker.should.have.property('attributes');
		worker.should.have.property('currentChapter');
		worker.delete.should.be.a.Function;
		worker.addChapter.should.be.a.Function;
		worker.setCurrentChapter.should.be.a.Function;
		worker.setName.should.be.a.Function;
		worker.addVerse.should.be.a.Function;
		worker.attributes.should.be.an.Object;
		worker.currentChapter.should.be.a.Function();
	});
	it('test subscriber/publisher', function(done) {
		var BookObserver, bookObserver, pubSub, subscription, worker;

		BookObserver = require('../../javascripts/observers/Book');
		bookObserver = BookObserver();
		pubSub = bookObserver.create();
		worker = pubSub.workerFunctions;
		subcription = worker.subscriber('test', function(data, env) {
			data.should.be.okay;
			data.should.be.an.Object;
			data.should.have.property('test1', 1);
			data.should.have.property('test2', 2);
			done();
			subcription.unsubscribe();
		});
		worker.publisher('test', {'test1':1, 'test2':2});
	});
	it('test addChapter', function(done) {
		var BookObserver, bookObserver, pubSub, subscription, worker;
		BookObserver = require('../../javascripts/observers/Book');
		bookObserver = BookObserver();
		pubSub = bookObserver.create();
		worker = pubSub.workerFunctions;
		subscription = worker.subscriber('book.chapters.crud.create.done', function(data, env) {
			data.should.be.okay;
			data.should.be.an.Object;
			data.should.be.an.instanceOf(Response);
			data.result.should.be.an.instanceOf(ChapterModel);
			done();
		});
		worker.addChapter();
	});
	it('test setCurrentChapter', function(done) {
		var BookObserver, bookObserver, pubSub, subscription, worker;
		BookObserver = require('../../javascripts/observers/Book');
		bookObserver = BookObserver();
		pubSub = bookObserver.create();
		worker = pubSub.workerFunctions;
		subscription = worker.subscriber('book.chapters.chapter.set', function(data, env) {
			data.should.be.instanceOf(Response);
			data.result.should.be.instanceOf(backbone.Model);
			data.context.should.be.instanceOf(backbone.Collection);
			done();
		});
		worker.setCurrentChapter(1);
	});

	it('test setName', function(done) {
		var BookObserver, bookObserver, pubSub, subscription, worker;
		BookObserver = require('../../javascripts/observers/Book');
		bookObserver = BookObserver();
		pubSub = bookObserver.create();
		worker = pubSub.workerFunctions;
		subscription = worker.subscriber('book.name.set', function(data, env) {
			data.should.be.instanceOf(Response);
			data.result.should.be.instanceOf.String;
			data.result.should.eql('testbookname');
			data.context.should.be.instanceOf(backbone.Model);
			done();
		});

		worker.setName('testbookname');

	});

	it('test addVerse', function(done) {
		var BookObserver, bookObserver, pubSub, subscription, worker;
		BookObserver = require('../../javascripts/observers/Book');
		bookObserver = BookObserver();
		pubSub = bookObserver.create();
		worker = pubSub.workerFunctions;
		subscription = worker.subscriber('chapters.chapter.verse.crud.create.done', function(data, env) {
			data.should.be.instanceOf(Response);
			data.result.should.be.instanceOf.String;
			data.result.get('text').should.eql('testaddverse');
			data.context.should.be.instanceOf(backbone.Collection);
			done();
		});

		worker.addVerse('testaddverse');

	});


/** Integrity Tests **/
/** integrity -- setCurrentChapter **/
	it('integrity -- test setCurrentChapter w/ a number that isn\'t in the collection', function(done) {
		var BookObserver, bookObserver, pubSub, subscription, worker;
		BookObserver = require('../../javascripts/observers/Book');
		bookObserver = BookObserver();
		pubSub = bookObserver.create();
		worker = pubSub.workerFunctions;
		subscription = worker.subscriber('book.chapters.chapter.set.error', function(data, env) {
			data.should.be.instanceOf(Response);
			should(data.result, null);
			should(data.context, null);
			data.code.status.should.eql(404);
			done();
		});

		worker.setCurrentChapter(13);
	});

	it('integrity -- test setCurrentChapter w/ a  null value', function(done) {
		var BookObserver, bookObserver, pubSub, subscription, worker;
		BookObserver = require('../../javascripts/observers/Book');
		bookObserver = BookObserver();
		pubSub = bookObserver.create();
		worker = pubSub.workerFunctions;
		subscription = worker.subscriber('book.chapters.chapter.set.error', function(data, env) {
			data.should.be.instanceOf(Response);
			should(data.result, null);
			should(data.context, null);
			data.code.status.should.eql(404);
			done();
		});

		worker.setCurrentChapter(null);
	});

	it('integrity -- test setCurrentChapter w/ a  string value', function(done) {
		var BookObserver, bookObserver, pubSub, subscription, worker;
		BookObserver = require('../../javascripts/observers/Book');
		bookObserver = BookObserver();
		pubSub = bookObserver.create();
		worker = pubSub.workerFunctions;
		subscription = worker.subscriber('book.chapters.chapter.set.error', function(data, env) {
			data.should.be.instanceOf(Response);
			should(data.result, null);
			should(data.context, null);
			data.code.status.should.eql(404);
			done();
		});

		worker.setCurrentChapter('test');
	});
/** end integrity -- setCurrentChapter

/** integrity -- setName **/

	it('integrity -- test setName w/ null value', function(done) {
		var BookObserver, bookObserver, pubSub, subscription, worker;
		BookObserver = require('../../javascripts/observers/Book');
		bookObserver = BookObserver();
		pubSub = bookObserver.create();
		worker = pubSub.workerFunctions;
		subscription = worker.subscriber('book.name.set.error', function(data, env) {
			data.should.be.instanceOf(Response);
			should(data.result, null);
			should(data.context, null);
			data.code.status.should.eql(500);
			done();
		});

		worker.setName(null);

	});

	it('integrity -- test setName w/ number value', function(done) {
		var BookObserver, bookObserver, pubSub, subscription, worker;
		BookObserver = require('../../javascripts/observers/Book');
		bookObserver = BookObserver();
		pubSub = bookObserver.create();
		worker = pubSub.workerFunctions;
		subscription = worker.subscriber('book.name.set.error', function(data, env) {
			data.should.be.instanceOf(Response);
			should(data.result, null);
			should(data.context, null);
			data.code.status.should.eql(500);
			done();
		});

		worker.setName(32);

	});

	it('integrity -- test setName w/ function', function(done) {
		var BookObserver, bookObserver, pubSub, subscription, worker;
		BookObserver = require('../../javascripts/observers/Book');
		bookObserver = BookObserver();
		pubSub = bookObserver.create();
		worker = pubSub.workerFunctions;
		subscription = worker.subscriber('book.name.set.error', function(data, env) {
			data.should.be.instanceOf(Response);
			should(data.result, null);
			should(data.context, null);
			data.code.status.should.eql(500);
			done();
		});

		worker.setName(function() {});

	});

	it('integrity -- test setName w/ object', function(done) {
		var BookObserver, bookObserver, pubSub, subscription, worker;
		BookObserver = require('../../javascripts/observers/Book');
		bookObserver = BookObserver();
		pubSub = bookObserver.create();
		worker = pubSub.workerFunctions;
		subscription = worker.subscriber('book.name.set.error', function(data, env) {
			data.should.be.instanceOf(Response);
			should(data.result, null);
			should(data.context, null);
			data.code.status.should.eql(500);
			done();
		});

		worker.setName({});

	});

	it('integrity -- test setName w/ array', function(done) {
		var BookObserver, bookObserver, pubSub, subscription, worker;
		BookObserver = require('../../javascripts/observers/Book');
		bookObserver = BookObserver();
		pubSub = bookObserver.create();
		worker = pubSub.workerFunctions;
		subscription = worker.subscriber('book.name.set.error', function(data, env) {
			data.should.be.instanceOf(Response);
			should(data.result, null);
			should(data.context, null);
			data.code.status.should.eql(500);
			done();
		});

		worker.setName([]);

	});

/** end integrity -- setName **/

/** integrity -- addVerse**/

	it('test addVerse w/ null value', function(done) {
		var BookObserver, bookObserver, pubSub, subscription, worker;
		BookObserver = require('../../javascripts/observers/Book');
		bookObserver = BookObserver();
		pubSub = bookObserver.create();
		worker = pubSub.workerFunctions;
		subscription = worker.subscriber('book.chapters.chapter.verse.crud.create.error.noVerse', function(data, env) {
			data.should.be.instanceOf(Response);
			should(data.result, null);
			data.code.status.should.eql(400);
			should(data.context, null);
			done();
		});

		worker.addVerse(null);

	});

	it('test addVerse w/ empty string value', function(done) {
		var BookObserver, bookObserver, pubSub, subscription, worker;
		BookObserver = require('../../javascripts/observers/Book');
		bookObserver = BookObserver();
		pubSub = bookObserver.create();
		worker = pubSub.workerFunctions;
		subscription = worker.subscriber('book.chapters.chapter.verse.crud.create.error.noVerse', function(data, env) {
			data.should.be.instanceOf(Response);
			should(data.result, null);
			data.code.status.should.eql(400);
			should(data.context, null);
			done();
		});

		worker.addVerse('');

	});

	it('test addVerse w/ function', function(done) {
		var BookObserver, bookObserver, pubSub, subscription, worker;
		BookObserver = require('../../javascripts/observers/Book');
		bookObserver = BookObserver();
		pubSub = bookObserver.create();
		worker = pubSub.workerFunctions;
		subscription = worker.subscriber('book.chapters.chapter.verse.crud.create.error.noVerse', function(data, env) {
			data.should.be.instanceOf(Response);
			should(data.result, null);
			data.code.status.should.eql(400);
			should(data.context, null);
			done();
		});

		worker.addVerse(function() {});

	});

	it('test addVerse w/ function', function(done) {
		var BookObserver, bookObserver, pubSub, subscription, worker;
		BookObserver = require('../../javascripts/observers/Book');
		bookObserver = BookObserver();
		pubSub = bookObserver.create();
		worker = pubSub.workerFunctions;
		subscription = worker.subscriber('book.chapters.chapter.verse.crud.create.error.noVerse', function(data, env) {
			data.should.be.instanceOf(Response);
			should(data.result, null);
			data.code.status.should.eql(400);
			should(data.context, null);
			done();
		});

		worker.addVerse(function() {});

	});


/** end integrity -- addVerse **/


});