module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-contrib-jasmine');
	grunt.loadNpmTasks('grunt-browserify');

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		browserify: {
			specs: {
				src: ["./public/tests/models/*.js", "./public/tests/collections/*.js"],
				dest: "./public/test/specs.js",
				options: {
					browserifyOptions: {
						debug: true,
						paths: ["./node_modules", "./public/javascripts"],
					}
				}
			}
		},
		jasmine: {
			tests: {
				src: [],
				options: {
					outfile: "public/test/_SpecRunner.html",
					specs: "public/test/specs.js"    
				}
			}
		}
	});

	grunt.registerTask('test', ['browserify:specs', 'jasmine']);
};