'use strict';
var gulp		= require('gulp'),

	autoprefixer	= require('gulp-autoprefixer'),
	clean			= require('gulp-clean'),
	concatJS		= require('gulp-concat'),
	concatCSS		= require('gulp-concat-css'),
	connect			= require('gulp-connect'),
	cssimport		= require("gulp-cssimport"),
	filter			= require('gulp-filter'),
	jade			= require('gulp-jade'),
	livereload		= require('gulp-livereload'),
	mainBowerFiles	= require('main-bower-files'),	
	minifyCSS		= require('gulp-minify-css'),
	minifyIMG		= require('gulp-imagemin'),
	minifyJS		= require('gulp-uglify'),
	notify			= require("gulp-notify"),
	plumber			= require('gulp-plumber'),
	rename			= require('gulp-rename'),
	rigger			= require('gulp-rigger'),
	sass			= require('gulp-sass');

// ----------------------------  CONFIGS  --------------------------

// paths
	var build = {
		root: 	'./build/',
		html: 	'./build/*.html',
		js: 	'./build/assets/js/',
		css: 	'./build/assets/css/',
		img: 	'./build/assets/images/',
		fonts: 	'./build/assets/fonts/'
	},
	src = {
		// html: 	'src/*.html',
		root: 	'./src/',
		jade: 	'./src/jade/views/*.jade',
		js: 	'./src/assets/js/app.js',
		sass: 	'./src/assets/sass/style.scss',
		img: 	'./src/assets/images/**/*.*',
		fonts: 	'./src/assets/fonts/**/*.{ttf,woff,woff2,eot,svg}'
	},
	watch = {
		// html: 	'src/**/*.html',
		jade: 	'./src/jade/**/*.jade',
		// jade: 	'./src/jade/views/*.jade',
		js: 	'./src/assets/js/**/*.js',
		sass: 	'./src/assets/sass/**/*.scss',
		img: 	'./src/assets/images/**/*.*',
		fonts: 	'./src/assets/fonts/**/*.*',
		bower: 	'./bower.json'
	};

// server config
	var server = {
		root: 'build',
		port: '8000'
	};

// ----------------------------  TASKS  ----------------------------

// server connect
	gulp.task('connect', function() {
		connect.server({
			root: server.root,
			port: server.port,
			livereload: true
		});
	});

// sass preprocessing
	gulp.task("sass", function () {
		gulp.src(src.sass)
			.pipe(plumber())
			// .pipe(sass().on('error', sass.logError))
			.pipe(sass())
			.pipe(cssimport())
			// .pipe(minifyCSS())
			.pipe(autoprefixer({browsers: ['last 30 versions']}))
			.pipe(rename('style.min.css'))
			.pipe(gulp.dest(build.css))
			.pipe(connect.reload())
			.pipe(notify("SASS compiled"));
	});

// jade preprocessing
	gulp.task('jade', function () {
		gulp.src(src.jade)
			.pipe(plumber())
			.pipe(jade({pretty: true}))
			.pipe(gulp.dest(build.root))
			.pipe(connect.reload())
			.pipe(notify("JADE compiled"));
	});

// js copy files
	gulp.task('js', function () {
		gulp.src(src.js)
			.pipe(plumber())
			.pipe(rigger())
			.pipe(plumber())
			// .pipe(minifyJS())
			.pipe(gulp.dest(build.js))
			.pipe(connect.reload())
			.pipe(notify("JS concat is done."));
	});

// images optimization
	gulp.task('img', function () {
		gulp.src(src.img)
			.pipe(minifyIMG())
			.pipe(gulp.dest(build.img))
	});

// fonts
	gulp.task('fonts', function () {
		gulp.src(src.fonts)
			.pipe(gulp.dest(build.fonts))
	});

// bower components auto concat and include
	gulp.task('bower-log', function () {
		var mainFiles = mainBowerFiles();
		console.log(mainFiles);
		return gulp.src(mainFiles);
	});

	gulp.task('bower', function () {
		gulp.src('./build/assets/**/vendor.*', {read: false})
			.pipe(clean());

		var jsFilter	= filter('**/*.js'),
			cssFilter	= filter('**/*.css');
		return gulp.src(mainBowerFiles())
			.pipe(jsFilter)
			.pipe(concatJS('vendor.js', {newLine: ';'}))
			.pipe(minifyJS()).pipe(rename({suffix: ".min"}))
			.pipe(gulp.dest(build.js))
			
			.pipe(jsFilter.restore())
			.pipe(cssFilter)
			.pipe(concatCSS('vendor.css'))
			.pipe(minifyCSS()).pipe(rename({suffix: ".min"}))
			.pipe(gulp.dest(build.css));
	});

// clean build folder
	gulp.task('clean', function () {
		return gulp.src('./build/*', {read: false})
			.pipe(clean());
	});
	gulp.task('clean:img', function () {
		return gulp.src('./build/assets/images', {read: false})
			.pipe(clean());
	});
	gulp.task('clean:fonts', function () {
		return gulp.src('./build/assets/fonts', {read: false})
			.pipe(clean());
	});

// watch
	gulp.task('watch', function () {
		gulp.watch(watch.js, ['js'])
		gulp.watch(watch.img, ['img'])
		gulp.watch(watch.jade, ['jade'])
		gulp.watch(watch.sass, ['sass'])
		gulp.watch(watch.bower, ['bower'])
	});

// default
gulp.task('default', ['connect', 'sass', 'jade',  'js', 'watch']);