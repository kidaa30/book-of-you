/**
 * @fileOverview Observer, i.e. the monologue abstraction between the knockout view models and backbone models/colleccitons
 * @author Josh Bowling
 * @version 0.0.1
 */
var BookModel, monologue, Worker, worker,_ ,Response, ko, Worker, util;

util = require('util');

_ = require('underscore');

ko = require('../../bower/knockout/dist/knockout.debug.js');

monologue = require('monologue.js');

Response = require('../utility/ResponseObject.js');

BookModel = require('../models/Book');

Worker = function(name) {
	var self;
	self = this;
	self.name = name;	
};

Worker.prototype = monologue.prototype;


Worker.prototype.create = function(name) {
	var self, book, workerFunctions, WorkerPropertyObservables;

	self = this;
	// this the backbone model that contains the name, chapters, verses
	book = new BookModel(name, null);

/** iteratively creates computed observables from backbone model attributes
	* @todo pull keys value from the model. model attributes is pulling back more than name/chapters at present
	* @todo investigate where this code is actually being used
*/
	WorkerPropertyObservables = function() {
		// assumes model/self since its operating in same context
		var keys, workerProperties, currentKey;
		/* pull this info from model attributes
		*/
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
	/** worker functions create an abstraction layer between model and returned object. this is the object that's given to the knockout side of the app 
	* @todo workerFunctions may need to be bifurcated because the observables contained herein aren't worker functions
	*/
	workerFunctions = {
		/* currently not implemented */
		delete: function() {
			self.emit('crud.delete.done', new Response(null, 200, null));
		},
		addChapter: function() {
			var chapters, newChapter;

			chapters = book.get('chapters');
			newChapter = new chapters.model(chapters.models.length + 1);
			chapters.add(newChapter);
			self.emit('book.chapters.crud.create.done', new Response(newChapter, 200, book.get('chapters')));

			return newChapter;
		},
		setCurrentChapter: function(num) {
			var chapter, chapters;

			// Check to see if chapter exists also
			if(!num || !_.isNumber(num)) {
				return self.emit('book.chapters.chapter.set.error', new Response(null, 404, null));
			}

			chapter = book.get('chapters').findWhere({num: num});
			if(!chapter) {
				console.log('error');
				return self.emit('book.chapters.chapter.set.error', new Response(null, 404, null));				
			}

			chapters = book.get('chapters');
			workerFunctions.currentChapter(num);
			self.emit('book.chapters.chapter.set', new Response(chapter, 200, chapters));
		},
		/** Set the book's name
		* @param {string} name
		*/
		setName: function(name) {
			if(!name || !_.isString(name)) {
				return self.emit('book.name.set.error', new Response(null, 500, null));
			}

			book.set('name', name);
			self.emit('book.name.set', new Response(name, 200, book));
		},
		/** Add a verse to currently selected chapter
		* @param {string} verseText
		*/		
		addVerse: function(verseText) {
			var chapters, chapter, verses, verse, num;

			chapter = self.workerFunctions.currentChapterObject();
			if(!chapter) {
				return self.emit('book.chapters.chapter.verse.crud.create.error', new Response(null, 500, null));
			}

			verses = chapter.get('verses');

			if(!_.isString(verseText) || verseText === '') {
				return self.emit('book.chapters.chapter.verse.crud.create.error.noVerse', new Response(null, 400, null));
			}

			verse = chapter.addVerse(verseText);
			self.emit('chapters.chapter.verse.crud.create.done', new Response(verse, 200, verses));
		},
		// model.attribute-based computed-s
		attributes: WorkerPropertyObservables(),
		// abstraction of monologue for use in view models
		subscriber: _.bind(self.on, self),
		// abstraction of monologue for use in view models
		publisher: _.bind(self.emit, self),
		/**
		* hold the current selected chapter... there is tension between this and setCurrentChapter.
		* @todo research which function (this or setCurrentChapter) is being used in the code more effectively and eliminate the other
		* @param {number}
		*/
		currentChapter: ko.observable(0),
		/**
		* @todo - remove from implementation
		*/
		currentChapterObject: ko.pureComputed(function() {
			return book.get('chapters').findWhere({num: workerFunctions.currentChapter()});
		}),
		/**
		* @param {bool}
		* @todo remove from implementation
		*/
		isCreated: ko.observable(false)
	};
	self.workerFunctions = workerFunctions;
	// emit the change to worker who will propogate the rest
	self.workerFunctions.currentChapter.subscribe(function(val) {
		self.workerFunctions.setCurrentChapter(val);
	});
	// emit the workerFunctions to the listeners
	self.emit('create.done', { book: workerFunctions });
	// change the chapter from 0 to 1
	self.workerFunctions.setCurrentChapter(1);
	return self;
};
/** used by knockout side to retrieve worker if the create.done event has already fired */
Worker.prototype.retrieve = function() {
	return worker.workerFunctions;
};
// create the worker if there's not one alrady (singleton)
module.exports = function() { 
	if(!worker){
		worker = new Worker();
		worker.create('New Book');
	}
	return worker;
};

