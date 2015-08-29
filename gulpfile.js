var gulp, gulpKarma, testFiles;


testFiles = [
	'./public/tests/models/Verse.js',
	'./public/tests/models/Chapter.js'

];
gulp = require('gulp');
gulpKarma = require('gulp-karma');

gulp.task('bundle', function() {
  // place code for your default task here
	var watchify = require('watchify');
	var browserify = require('browserify');
	var gulp = require('gulp');
	var source = require('vinyl-source-stream');
	var buffer = require('vinyl-buffer');
	var gutil = require('gulp-util');
	var sourcemaps = require('gulp-sourcemaps');
	var assign = require('lodash.assign');

	// add custom browserify options here
	var customOpts = {
	  entries: ['./public/javascripts/app.js'],
	  debug: true
	};
	var opts = assign({}, watchify.args, customOpts);

//	var b = watchify(browserify(opts)); 

	// add transformations here
	// i.e. b.transform(coffeeify);

//	gulp.task('js', bundle); // so you can run `gulp js` to build the file
//	b.on('update', bundle); // on any dep update, runs the bundler
//	b.on('log', gutil.log); // output build logs to terminal
	var b = browserify(opts);

	function bundle() {
	  return b.bundle()
	    // log errors if they happen
	    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
	    .pipe(source('error.txt'))
	    // optional, remove if you don't need to buffer file contents
	    .pipe(buffer())
	    // optional, remove if you dont want sourcemaps
	    .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
	       // Add transformation tasks to the pipeline here.
	    .pipe(sourcemaps.write('./')) // writes .map file
	    .pipe(gulp.dest('bundle.js'));
	}
	bundle();
});


gulp.task('templates', function() {
  var YOUR_LOCALS, jade, makeTemplates;
  YOUR_LOCALS = {title: 'book of you'};
  jade = require('gulp-jade');
  makeTemplates = function() {
    gulp.src('./views/templates/*')
	    .pipe(jade({
	      locals: YOUR_LOCALS
	    }))
	    .pipe(gulp.dest('./public/html'))
  };
  makeTemplates();

});

gulp.task('test', function() {
    gulp.src(testFiles)
    .pipe(gulpKarma({
      configFile: './test.conf.js',
      action: 'run'
    }))
    .on('error', function(err) {
      // Make sure failed tests cause gulp to exit non-zero 
      console.log(err);
      throw err;
    });	
});