var gulp = require('gulp');
var gutil = require('gulp-util');
var merge = require('merge-stream');

var cssnano = require('gulp-cssnano');

var uglify = require('gulp-uglify'),
    concat = require('gulp-concat');

var imagemin = require('gulp-imagemin');

var htmlmin = require('gulp-htmlmin');

var inlinesource = require('gulp-inline-source');
var inlineCss = require('gulp-inline-css');

gulp.task('js', function() {
  var idx = gulp.src('src/js/*.js')
      .pipe(uglify())
      .pipe(concat('perfmatters.js'))
      .pipe(gulp.dest('js'));

  var pizza = gulp.src('src/views/js/*.js')
      .pipe(uglify())
      .pipe(concat('main.js'))
      .pipe(gulp.dest('views/js'));

  return merge(idx, pizza);
});

gulp.task('css', function() {
  var idx = gulp.src('src/css/*.css')
      .pipe(cssnano({
        minifyFontValues: false, discardUnused: false
      }))
      .pipe(gulp.dest('css'));

  var pizza = gulp.src('src/views/css/*.css')
      .pipe(cssnano({
        minifyFontValues: false, discardUnused: false
      }))
      .pipe(gulp.dest('views/css'));

  return merge(idx, pizza);

});

gulp.task('imgs', function() {
  var idx = gulp.src('src/img/*')
      .pipe(imagemin({
        optimizationLevel: 3,
        progressive: true
      }))
      .pipe(gulp.dest('img'));

  var pizza = gulp.src('src/views/images/*')
      .pipe(imagemin())
      .pipe(gulp.dest('views/images'));

  return merge(idx, pizza);
});

gulp.task('html', function() {
  var idx = gulp.src('src/*.html')
      .pipe(inlinesource())
      // .pipe(inlineCss({
      //   applyStyleTags: true,
      //   removeStyleTags: true,
      //   applyLinkTags: false,
      //   removeLinkTags: false
      // }))
      .pipe(htmlmin({collapseWhitespace: true}))
      .pipe(gulp.dest(''));

  var pizza = gulp.src('src/views/*.html')
      .pipe(inlinesource())
      .pipe(inlineCss({
        applyStyleTags: true,
        removeStyleTags: true,
        applyLinkTags: false,
        removeLinkTags: false
      }))
      .pipe(htmlmin({collapseWhitespace: true}))
      .pipe(gulp.dest('views'));

  return merge(idx, pizza);
});

gulp.task('default', ['js', 'css', 'imgs', 'html']);
