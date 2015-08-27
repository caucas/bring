'use strict';
var gulp			= require('gulp'),

	autoprefixer	= require('gulp-autoprefixer'),
	browserSync		= require('browser-sync').create(),
	concatJS		= require('gulp-concat'),
	concatCSS		= require('gulp-concat-css'),
	cssimport		= require("gulp-cssimport"),
	del				= require('del'),
	filter			= require('gulp-filter'),
	gulpsync		= require('gulp-sync')(gulp),
	jade			= require('gulp-jade'),
	mainBowerFiles	= require('main-bower-files'),	
	minifyCSS		= require('gulp-minify-css'),
	minifyIMG		= require('gulp-imagemin'),
	minifyPNG		= require('imagemin-pngquant'),
	minifyJS		= require('gulp-uglify'),
	notify			= require("gulp-notify"),
	plumber			= require('gulp-plumber'),
	rename			= require('gulp-rename'),
	rigger			= require('gulp-rigger'),
	sass			= require('gulp-sass'),
	sourcemaps		= require('gulp-sourcemaps'),
	reload			= browserSync.reload;

// ----------------------------  CONFIGS  --------------------------

// paths
	var build = {
		root: 		'./build/',
		templates: 	'./build/jade/',
		js: 		'./build/assets/js/',
		css: 		'./build/assets/css/',
		img: 		'./build/assets/images/',
		fonts: 		'./build/assets/fonts/'
	},
	src = {
		root: 		'./src/',
		templates: 	'./src/jade/**/*.jade',
		jade:		'./src/jade/views/*.jade',
		js: 		'./src/assets/js/app.js',
		sass: 		'./src/assets/sass/style.scss',
		img: 		'./src/assets/images/**/*.*',
		fonts: 		'./src/assets/fonts/**/*.{ttf,woff,woff2,eot,svg}'
	},
	watch = {
		jade: 		'./src/jade/**/*.jade',
		js: 		'./src/assets/js/**/*.js',
		sass: 		'./src/assets/sass/**/*.scss',
		img: 		'./src/assets/images/**/*.*',
		fonts: 		'./src/assets/fonts/**/*.*',
		bower: 		'./bower.json'
	};

// server config
	var serverConfig = {
		server: {
			baseDir: "./build"
		},
		// tunnel: 'bringo',
		host: 'localhost',
		port: 8000
	};

// ----------------------------  TASKS  ----------------------------

// server init
	gulp.task('serve', function() {
		browserSync.init(serverConfig);
	});

// sass
	gulp.task("sass", function () {
		gulp.src(src.sass)
			.pipe(plumber())
			.pipe(sass())
			.pipe(cssimport())
			.pipe(autoprefixer({browsers: ['last 30 versions']}))
			// .pipe(sourcemaps.init())
			.pipe(minifyCSS({advanced: false}))
			.pipe(rename({suffix: ".min"}))
			// .pipe(sourcemaps.write())
			.pipe(gulp.dest(build.css))
			.pipe(reload({stream: true}))
			.pipe(notify("SASS compiled"))
	});

// jade (just views)
	gulp.task('jade', function () {
		gulp.src(src.jade)
			.pipe(plumber())
			.pipe(jade({pretty: true}))
			.pipe(gulp.dest(build.root))
			.pipe(notify("JADE compiled"))
			.pipe(reload({stream: true}))
	});

// compile all jade templates
	gulp.task('templates', function () {
		gulp.src(src.templates)
			.pipe(plumber())
			.pipe(jade({pretty: true}))
			.pipe(gulp.dest(build.templates))
			.pipe(notify("TEMPLATES compiled"));
	});

// js
	gulp.task('js', function () {
		gulp.src(src.js)
			.pipe(rigger())
			.pipe(plumber())
			.pipe(sourcemaps.init())
			.pipe(minifyJS())
			.pipe(sourcemaps.write())
			.pipe(gulp.dest(build.js))
			.pipe(reload({stream: true}))
			.pipe(notify("JS concat is done."));
	});

// images
	// очищаем таким образом (в отдельном таске)
	// для синхронного выполнения задач
	gulp.task('img:clean', function () {
		del.sync(build.img);
	});
	gulp.task('img:update', ['img:clean'], function () {
		gulp.src(src.img)
			.pipe(minifyIMG({
				progressive: true,
				use: [minifyPNG()]
			}))
			.pipe(gulp.dest(build.img))
	});
	gulp.task('img:build', function () {
		gulp.src(src.img)
			.pipe(minifyIMG({
				progressive: true,
				use: [minifyPNG()]
			}))
			.pipe(gulp.dest(build.img))
	});

// fonts
	gulp.task('fonts:clean', function () {
		del.sync(build.fonts);
	});
	gulp.task('fonts:update', ['fonts:clean'], function () {
		gulp.src(src.fonts)
			.pipe(gulp.dest(build.fonts))
	});
	gulp.task('fonts:build', function () {
		gulp.src(src.fonts)
			.pipe(gulp.dest(build.fonts))
	});

// bower components auto concat and include
	gulp.task('bower', function () {
		var jsFilter	= filter('**/*.js'),
			cssFilter	= filter('**/*.css');

		// удаляем все файлы, в названии которых есть слово vendor
		del.sync('./build/assets/**/vendor.*');

		// получаем пути всех библиотек bower'a и передаем их в src
		return gulp.src(mainBowerFiles())
			// берем из них только js файлы
			.pipe(jsFilter)
			 // и лепим один vendor.js
			.pipe(concatJS('vendor.js', {newLine: ';'}))
			.pipe(minifyJS()).pipe(rename({suffix: ".min"}))
			.pipe(gulp.dest(build.js))

			// сбрасываем фильтр
			.pipe(jsFilter.restore())

			// и проделываем тоже самое с css файлами
			.pipe(cssFilter)
			.pipe(concatCSS('vendor.css'))
			.pipe(minifyCSS()).pipe(rename({suffix: ".min"}))
			.pipe(gulp.dest(build.css));
	});

// build clean
	gulp.task('clean', function () {
		del.sync(build.root)
	});

// watch
	gulp.task('watch', function () {
		gulp.watch(watch.js, ['js'])
		gulp.watch(watch.img, ['img'])
		gulp.watch(watch.jade, ['jade'])
		gulp.watch(watch.sass, ['sass'])
	});

// build
	gulp.task('build',  gulpsync.sync(['sass', 'jade', 'js', 'fonts:build', 'img:build', 'bower']));

// default
	// gulp.task('default', gulpsync.sync(['build', 'serve']), function () {
	// 	gulp.watch(watch.js, ['js'], reload);
	// 	gulp.watch(watch.jade, ['jade'], reload);
	// 	gulp.watch(watch.sass, ['sass'], reload);
	// });
	gulp.task('default', gulpsync.sync(['build', 'serve', 'watch']));