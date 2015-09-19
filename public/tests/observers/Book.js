var backbone, ChapterCollection, ChapterModel, Response, should,  subscriptions, _;

should = require('should');
backbone = require('backbone');
_ = require('underscore');

Response = require('../../javascripts/utility/ResponseObject');
ChapterCollection = require('../../javascripts/collections/Chapter');
ChapterModel = require('../../javascripts/models/Chapter');
subscriptions = require('../../javascripts/collections/subscriptions');

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
		worker.should.have.property('setName');
		worker.should.have.property('addVerse');
		worker.should.have.property('attributes');
		worker.should.have.property('currentChapter');
		worker.delete.should.be.a.Function;
		worker.addChapter.should.be.a.Function;
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
		subscription = worker.subscriber(subscriptions.book.chapters.crud.create.done, function(data, env) {
			data.should.be.okay;
			data.should.be.an.Object;
			data.should.be.an.instanceOf(Response);
			data.result.should.be.an.instanceOf(ChapterModel);
			done();
		});
		worker.addChapter();
	});

	it('test setName', function(done) {
		var BookObserver, bookObserver, pubSub, subscription, worker;
		BookObserver = require('../../javascripts/observers/Book');
		bookObserver = BookObserver();
		pubSub = bookObserver.create();
		worker = pubSub.workerFunctions;
		subscription = worker.subscriber(subscriptions.book.name.set, function(data, env) {
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
		console.log(subscriptions.book.chapters.chapter.verses.verse.crud.create.done);
		subscription = worker.subscriber(subscriptions.book.chapters.chapter.verses.verse.crud.create.done, function(data, env) {
			data.should.be.instanceOf(Response);
			data.result.should.be.instanceOf.String;
			data.result.get('text').should.eql('testaddverse');
			data.context.should.be.instanceOf(backbone.Collection);
			done();
		});

		worker.addVerse('testaddverse');

	});


/** Integrity Tests **/

/** integrity -- setName **/

	it('integrity -- test setName w/ null value', function(done) {
		var BookObserver, bookObserver, pubSub, subscription, worker;
		BookObserver = require('../../javascripts/observers/Book');
		bookObserver = BookObserver();
		pubSub = bookObserver.create();
		worker = pubSub.workerFunctions;
		subscription = worker.subscriber(subscriptions.book.name.setError, function(data, env) {
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
		subscription = worker.subscriber(subscriptions.book.name.setError, function(data, env) {
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
		subscription = worker.subscriber(subscriptions.book.name.setError, function(data, env) {
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
		subscription = worker.subscriber(subscriptions.book.name.setError, function(data, env) {
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
		subscription = worker.subscriber(subscriptions.book.chapters.chapter.verses.verse.crud.create.errorNoVerse, function(data, env) {
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
		subscription = worker.subscriber(subscriptions.book.chapters.chapter.verses.verse.crud.create.errorNoVerse, function(data, env) {
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
		subscription = worker.subscriber(subscriptions.book.chapters.chapter.verses.verse.crud.create.errorNoVerse, function(data, env) {
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
		subscription = worker.subscriber(subscriptions.book.chapters.chapter.verses.verse.crud.create.errorNoVerse, function(data, env) {
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