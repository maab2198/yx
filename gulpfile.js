"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var minify = require("gulp-csso");
var rename = require("gulp-rename");
var server = require("browser-sync").create();
var rename = require("gulp-rename");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var del = require("del");
var run = require("run-sequence");
var deploy = require('gulp-gh-pages');
var csscomb = require('gulp-csscomb');
var wait = require('gulp-wait');
var deploy  = require('gulp-gh-pages');

gulp.task('deploy', function () {
  return gulp.src("./dist/**/*")
    .pipe(deploy())
});

gulp.task("style", function() {
 return gulp.src("./src/style/style.scss")
    .pipe(plumber())
    .pipe(wait(1500))
    .pipe(sass().on('error', sass.logError)) 
    .pipe(csscomb())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("dist/css")) //file css to folder src
    .pipe(minify())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("dist/css"));
});


gulp.task("html", function () {
  return gulp.src("./*.html")
    .pipe(posthtml([
      include()
    ]))
    .pipe(gulp.dest("dist"));
});

gulp.task("serve", function() {
  server.init({
    server: "dist/"
  });

  gulp.watch("src/style/*.scss", ["style"]).on("change", server.reload);
  gulp.watch("*.html",["html"]).on("change", server.reload);
});

gulp.task("copy", function(){
  return gulp.src([
    "src/fonts/**/*.{woff,woff2}",
    "src/img/**",
    "src/js/**"
    ], {
      base: "src"
    })
  .pipe(gulp.dest("dist"));
});

gulp.task("clean", function() {
  return del("dist");
});

gulp.task("build", function(done) {
  return run(
      "clean",
      "copy",
      "style",
      "html",
      done
    );
});


gulp.task('deploy', function () {
  return gulp.src("dist/**/*")
    .pipe(deploy())
});
