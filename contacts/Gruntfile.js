var path = require('path');

var pathToConfig = path.join('config', 'require.config.js');

module.exports = function(grunt){

	var paths = {
      "core": path.resolve("src"),
      "common": path.resolve("common"),
      "lodash": path.resolve("lib/lodash"),
      "jquery": path.resolve("lib/jquery"),
      "angular": path.resolve("lib/angular"),
      "ui.router": path.resolve("lib/angular-ui-router"),
      "angular-animate": path.resolve("lib/angular-animate")
    };


	//初始化Grunt
	grunt.initConfig({
		pkg : grunt.file.readJSON('package.json'),
		cssmin:{
            minify: {
                expand: true,
                cwd: 'css/',
                src: ['*.css', '!*.min.css'],
                dest: 'build/css/',
                ext: '.min.css',
            },
            combine: {
                files: {
                    'build/css/all.min.css': ['css/*.min.css']
                }
            }
        },
		requirejs : {
			root : {
				options: {
		            baseUrl: "src",
		            uglify2: {
		                mangle: false
		            },
		            optimize : 'none',
		            modules: [{
		                name: 'bootstrap'
		            }],
		            removeCombined: true,
		            dir: 'build',
		            useStrict: true,
		            paths: paths,
		            mainConfigFile: pathToConfig
	        }}
		},
		watch : {
			'root-requirejs' : { 
				files: 
					['src/**/*.js',
				     'common/**/*.js'
				    ],
			  	tasks: [ 'requirejs:root','copy','clean' ],
			  	options: { livereload: true } 
			},
			'root-cssmin': {
				files:
					['css/*.css'
					],
				tasks: ['cssmin','copy','clean'],
				options: { livereload: true } 
			}
		},
		clean:{
            dist:{
                src:'build/**/' 
            }
        },
        copy: {
		  main: {
		  	expand: true,
		    src: ['build/css/all.min.css','build/bootstrap.js'],
		    dest: 'dest/',
		    flatten: true
		  }
		}
	});

	//加载任务
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-copy');

	//创建默认任务
	grunt.registerTask('build', ['requirejs:root','cssmin','copy','clean']);

}