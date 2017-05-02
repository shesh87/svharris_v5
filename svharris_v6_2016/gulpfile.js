/* eslint-env node */

var gulp = require("gulp");
var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");
var eslint = require("gulp-eslint");
// var browserSync = require('browser-sync').create();
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var cssnano = require("gulp-cssnano");

gulp.task("default", ["styles", "lint"], function() {
	gulp.watch("public/app/css/sass/**/*.scss", ["styles"]);
	gulp.watch("public/app/scripts/*.js", ["lint"]);
	gulp.watch("public/app/scripts/*.js", ["scripts"]);
	// browserSync.init({
	// 	server: "./views/index.erb"
	// });
});

gulp.task("styles", function() {
	gulp.src("public/app/css/sass/all.scss")
		.pipe(sass().on("error", sass.logError))
		.pipe(autoprefixer("last 2 versions"))
		.pipe(gulp.dest("public/app/css"))
		.pipe(cssnano())
		.pipe(gulp.dest("public/app/css"));
});

gulp.task("lint", function () {
	return gulp.src([
		"public/app/scripts/app.js",
		"public/app/scripts/**/*.js"
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

gulp.task("scripts", function() {
	return gulp.src([
		"public/app/scripts/angular__1.2.26.min.js",
		"public/app/scripts/app.js", 
		"public/app/scripts/angular-route__1.2.26.min.js",
		"public/app/scripts/function.js",
		"public/app/scripts/validation.js"
	])
	.pipe(concat("all.js"))
    .pipe(gulp.dest("public/app/scripts"))
    .pipe(uglify())
    .pipe(gulp.dest("public/app/scripts"));
});




