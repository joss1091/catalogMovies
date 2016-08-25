var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minify = require('gulp-minify-css')


gulp.task('js', function () {
   gulp.src('public/javascripts/*.js')
   	  .pipe(concat('app.min.js'))
      .pipe(uglify())
      .pipe(gulp.dest('public/javascripts/build'))
});

gulp.task('css', function(){
   gulp.src('public/stylesheets/*.css')
   .pipe(concat('app.min.css'))
   .pipe(minify())
   .pipe(gulp.dest('public/stylesheets/build'));
});

gulp.task('default',['js','css'],function(){
});