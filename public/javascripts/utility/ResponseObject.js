/**
 * @fileOverview Response object used when publishing data
 * @author Josh Bowling
 * @version 0.0.1
 */


var ResponseObject, httpWell, statusWell, phraseWell;

httpWell = require('know-your-http-well');
statusWell = httpWell.statusPhrasesToCodes;
phraseWell = httpWell.statusCodesToPhrases;

ResponseObject = function(result, code, context) {
	this.result = result;
	this.code = {status: code, phrase: phraseWell[code]};
	if(context) {
		this.context = context;
	}
};

module.exports = ResponseObject;