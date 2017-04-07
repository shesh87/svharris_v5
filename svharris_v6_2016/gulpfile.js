/* eslint-env node */

var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var eslint = require('gulp-eslint');
// var browserSync = require('browser-sync').create();

gulp.task('default', ['styles', 'lint'], function() {
	gulp.watch('app/public/css/sass/**/*.scss', ['styles']);
	gulp.watch('app/public/scripts/*.js', ['lint']);
	// browserSync.init({
	// 	server: './views/index.erb'
	// });
});

gulp.task('styles', function() {
	gulp.src('app/public/css/sass/all.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 2 versions']
		}))
		.pipe(gulp.dest('./app/public/css'));
		// .pipe(browserSync.stream());
});

gulp.task('lint', function () {
	return gulp.src([
		'!app/public/scripts/jquery.flexslider-min.js',
		'app/public/scripts/*.js'
	])
		// eslint() attaches the lint output to the eslint property
		// of the file object so it can be used by other modules.
		.pipe(eslint())
		// eslint.format() outputs the lint results to the console.
		// Alternatively use eslint.formatEach() (see Docs).
		.pipe(eslint.format())
		// To have the process exit with an error code (1) on
		// lint error, return the stream and pipe to failOnError last.
		.pipe(eslint.failOnError());
});
