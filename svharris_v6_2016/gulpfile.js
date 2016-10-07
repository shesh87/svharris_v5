var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('default', function() {
	console.log('hello world!');
});

gulp.task('styles', function() {
	console.log("sass working..");
	gulp.src('public/css/sass/all.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 2 versions']
		}))
		.pipe(gulp.dest('./public/css'));
});