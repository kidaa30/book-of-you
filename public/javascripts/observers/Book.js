/**
 * @fileOverview Observer, i.e. the monologue abstraction between the knockout view models and backbone models/colleccitons
 * @author Josh Bowling
 * @version 0.0.1
 */
var BookCollection, BookModel, monologue,_ , ko, Response, subscriptions, Worker, worker, util;

util = require('util');

_ = require('underscore');

ko = require('../../bower/knockout/dist/knockout.debug.js');

monologue = require('monologue.js');

Response = require('../utility/ResponseObject.js');
BookModel = require('../models/Book');
BookCollection = require('../collections/Book');
subscriptions = require('../collections/subscriptions');

Worker = function(name) {
	var self;
	self = this;
	self.name = name;	
};

Worker.prototype = monologue.prototype;


Worker.prototype.create = function(name) {
	var self, book, bookCollection, workerFunctions, workerPropertyObservables,
		_currentChapterNum;

	_currentChapterNum = 1;

	self = this;
	// this the backbone model that contains the name, chapters, verses
	bookCollection = new BookCollection();
	if(bookCollection.models.length === 0) {
		book = new BookModel(name, null);
		bookCollection.add(book);
	} else {
		book = bookCollection.first();
	}
/** iteratively creates computed observables from backbone model attributes
	* @todo pull keys value from the model. model attributes is pulling back more than name/chapters at present
	* @todo investigate where this code is actually being used
*/
	workerPropertyObservables = function() {
		// assumes model/self since its operating in same context
		var currentKey, keys, workerProperties;
		/* pull this info from model attributes
		*/
		keys = ['name', 'chapters'];
		workerProperties = {};
		_.each(keys, function(key, keyi) {
			workerProperties[key] = ko.pureComputed(
				{
					read: function() {
						var result;
						result = book.get(key);
						return result;
					},
					write: function(val) {
						var result;
						// will use to verify validation, etc
						result = true;
						model.set(key, val);
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
			self.emit(subscriptions.book.crud.delete.done, new Response(null, 200, null));
		},
		addChapter: function() {
			var chapters, newChapter;

			chapters = book.get('chapters');
			newChapter = new chapters.model(chapters.models.length + 1);
			chapters.add(newChapter);
			self.emit(subscriptions.book.chapters.crud.create.done, new Response(newChapter, 200, book.get('chapters')));

			return newChapter;
		},
		/** Set the book's name
		* @param {string} name
		*/
		setName: function(name) {
			if(!name || !_.isString(name)) {
				return self.emit(subscriptions.book.name.setError, new Response(null, 500, null));
			}
			book.set('name', name, subscriptions.book.name.set);

			self.emit(subscriptions.book.name.set, new Response(name, 200, book));
		},
		/** Add a verse to currently selected chapter
		* @param {string} verseText
		*/		
		addVerse: function(verseText) {
			var chapters, chapter, verses, verse, num;

			chapter = book.get('chapters').findWhere({num:_currentChapterNum});
			if(!chapter) {
				return self.emit(subscriptions.book.chapters.chapter.verses.verse.crud.create.error, new Response(null, 500, null));
			}
			verses = chapter.get('verses');
			if(!_.isString(verseText) || verseText === '') {
				return self.emit(subscriptions.book.chapters.chapter.verses.verse.crud.create.errorNoVerse, new Response(null, 400, null));
			}

			verse = chapter.addVerse(verseText);
			self.emit(subscriptions.book.chapters.chapter.verses.verse.crud.create.done, new Response(verse, 200, verses));
		},
		// model.attribute-based computed-s
		attributes: workerPropertyObservables(),
		// abstraction of monologue for use in view models
		subscriber: _.bind(self.on, self),
		// abstraction of monologue for use in view models
		publisher: _.bind(self.emit, self),
		currentChapter: ko.pureComputed({
			read: function() {
				return book.get('chapters').findWhere({num: _currentChapterNum});
			},
			write: function(val) {
				var chapter, _oldChapterNum;
				chapter = book.get('chapters').findWhere({num: val});
				if(!chapter) {
					return self.emit(subscriptions.book.chapters.chapter.setError, new Response(null, 404, null));
				};

				_currentChapterNum = val;
				console.log('gd num from pubs', chapter.get('num'));
				self.emit(subscriptions.book.chapters.chapter.set, new Response(chapter, 200, {}));	
			}
		}),
		currentChapterNum: ko.pureComputed(function() {
			return _currentChapterNum;
		}),
		toJSON: function() {
			return book.toJSON();
		}
	};
	self.workerFunctions = workerFunctions;
	// emit the workerFunctions to the listeners
	self.emit(subscriptions.book.crud.create.done, {book: workerFunctions});
	// change the chapter from 0 to 1
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

