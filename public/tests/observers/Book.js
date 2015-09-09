var ChapterCollection, ChapterModel, Response, should, _;

should = require('should');

_ = require('underscore');

Response = require('../../javascripts/utility/ResponseObject');

ChapterCollection = require('../../javascripts/collections/Chapter');

ChapterModel = require('../../javascripts/models/Chapter');

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
		var subscription = worker.subscriber('chapters.crud.create.done', function(data, env) {
			data.should.be.okay;
			data.should.be.an.Object;
			data.should.be.an.instanceOf(Response);
			data.result.should.be.an.instanceOf(ChapterModel);
			done();
		});
		worker.addChapter();
	});
});