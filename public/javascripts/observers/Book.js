var BookModel, monologue, Worker, worker,_ ,Response, ko, Worker, util, tmplEmission, STATUS;

util = require('util');

_ = require('underscore');

ko = require('../../bower/knockout/dist/knockout.debug.js');

STATUS = {
	'start':0,
	'complete':1,
	'error':2,
	'invalid':3
};

Response = require('../utility/ResponseObject.js');

BookModel = require('../models/Book');

tmplEmission = function(model, property, action, state) {
	var tmpl, result;
	
	tmpl = '%s.%s.%s.%s';
	result = util.format(tmpl, model, property, action, state);

	return result;
};

Worker = function(name) {
	var self;
	self = this;
	self.name = name;	
};

monologue = require('monologue.js');
///CRUD TYPES

Worker.prototype = monologue.prototype;


Worker.prototype.create = function(name) {
	var self, book, workerFunctions, model, WorkerPropertyObservables;
	// model is the intercept value for abstracting the Factory out
	self = this;
	// for empty chapters
	book = new BookModel(name, null);
	window.book = book;
	// assumes model/self since its operating in same context
	WorkerPropertyObservables = function() {
		var keys, workerProperties, currentKey;
		// pull this info from model attributes
		keys = ['name', 'chapters'];
		workerProperties = {};
		_.each(keys, function(key, keyi) {
			workerProperties[key] = ko.pureComputed(
				{
					read: function() {
						var result;
						result = model.get(key);
						return result;
					},
					write: function(val) {
						var result;
						// will use to verify validation, etc
						result = true;
						model.set(key);
						return result;
					}
				}
			);
		});
		return workerProperties;
	};
	// set worker to book
	model = book;
	// worker functions create an abstraction layer between model and returned object
	workerFunctions = {
		delete: function() {
			self.emit('crud.delete.done', new Response(null, 200, null));
		},
		addChapter: function() {
			var chapters, newChapter;
			chapters = book.get('chapters');
			newChapter = new chapters.model(chapters.models.length + 1);
			chapters.add(newChapter);
			console.log(newChapter);
			self.emit('chapters.crud.create.done', new Response(newChapter, 200, book.get('chapters')));

			return newChapter;
		},
		setCurrentChapter: function(num) {
			var chapter, chapters;
			chapter = book.get('chapters').findWhere({num: num});
			chapters = book.get('chapters');
			workerFunctions.currentChapter(num);
			self.emit('chapters.chapter.set', new Response(chapter, 200, chapters));
		},
		setName: function(name) {
			console.log(name);
			if(!name || !_.isString(name)) {
				return self.emit('book.name.set.error', new Response(null, 404, null));
			}
			book.set('name', name);
			self.emit('book.name.set', new Response(name, 200, book));
		},
		currentChapter: ko.observable(0),
		currentChapterObject: ko.pureComputed(function() {
			return book.get('chapters').findWhere({num: workerFunctions.currentChapter()});
		}),
		isCreated: ko.observable(false),
		addVerse: function(verseText) {
			var chapters, chapter, verses, verse, num;
			chapter = self.workerFunctions.currentChapterObject();
			if(!chapter) {
//				chapter = book.addChapter();
//				console.log('noChapter', book.get('chapters').toJSON());
				return self.emit('chapters.chapter.verse.crud.create.error', new Response(null, 404, null));
			}
			verses = chapter.get('verses');

			if(!_.isString(verseText) || verseText === '') {
				return self.emit('chapters.chapter.verse.crud.create.error.noVerse', new Response(null, 404, null));
			}
			verse = chapter.addVerse(verseText);
			self.emit('chapters.chapter.verse.crud.create.done', new Response(verse, 200, verses));
		},
		attributes: WorkerPropertyObservables(),
		subscriber: _.bind(self.on, self),
		publisher: _.bind(self.emit, self)
	};
	self.workerFunctions = workerFunctions;
	// emit the change to worker who will propogate the rest
	self.workerFunctions.currentChapter.subscribe(function(val) {
		self.workerFunctions.setCurrentChapter(val);
	});
	self.emit('create.done', { book: workerFunctions });
	// change the chapter from 0 to 1
	self.workerFunctions.setCurrentChapter(1);
	return self;
};

Worker.prototype.retrieve = function() {
	return worker.workerFunctions;
};

module.exports = function() { 
	if(!worker){
		worker = new Worker();
		worker.create('New Book');
	}
	return worker;
};

