'use strict';

/**
 * Build task
 */

var gulp                 = require('gulp');
//var path                 = require('path');
//var sq                   = require('streamqueue');
var runSequence          = require('run-sequence');
var del                  = require('del');
var plumber              = require('gulp-plumber');
//var usemin               = require('gulp-usemin');
//var cssRebaseUrls        = require('gulp-css-rebase-urls');
var autoprefixer         = require('gulp-autoprefixer');
//var minifyCss            = require('gulp-minify-css');
//var angularTemplatecache = require('gulp-angular-templatecache');
//var concat               = require('gulp-concat');
//var ngAnnotate           = require('gulp-ng-annotate');
//var uglify               = require('gulp-uglify');
//var replace              = require('gulp-replace');
//var revAll               = require('gulp-rev-all');
//var revToExclude         = require('./config/revFilesToExclude');
var less                 = require('gulp-less');

var toDelete = [];

module.exports = function (done) {
  runSequence(
    ['clean:dist', 'less'],
//    ['usemin', 'copy:dist'],
//    ['replace', 'scripts', 'cssmin'],
//    'rev',
    'clean:finish',
    done);
};

gulp.task('less', function() {
    return gulp
        .src('assets/styles/importer.less')
        .pipe(plumber()) // exit gracefully if something fails after this
        .pipe(less())
//        .on('error', errorLogger) // more verbose and dupe output. requires emit.
        .pipe(autoprefixer({browsers: ['last 2 version', '> 5%']}))
        .pipe(gulp.dest('assets/styles'));
});

gulp.task('clean:dist', function (done) {
  del(['dist/**', '!dist', '!dist/.git{,/**}'], done);
});

gulp.task('clean:finish', function (done) {
  del([
    '.tmp/**',
    'dist/client/app.{css,js}'
  ].concat(toDelete), done);
});

gulp.task('copy:dist', function () {
  var main = gulp.src(['server/**/*', 'package.json'], { base: './' });
  var assets = gulp.src('client/assets/**/*', { base: './' });

  return sq({ objectMode: true }, main, assets)
    .pipe(gulp.dest('dist/'));
});

/*
gulp.task('usemin', ['inject'], function () {
  return gulp.src('client/index.html')
    .pipe(plumber())
    .pipe(usemin({ css: [cssRebaseUrls({ root: 'client' }), 'concat'] }))
    .pipe(gulp.dest('dist/client/'));
});

gulp.task('cssmin', function () {
  return gulp.src('dist/client/app.css')
    .pipe(autoprefixer())
    .pipe(minifyCss())
    .pipe(gulp.dest('dist/client/'));
});
*/

//gulp.task('scripts', function () {
//  var views = gulp.src('client/views/**/*.html')
//    .pipe(angularTemplatecache({
//      root: 'views',
//      module: 'demo'
//    }));

//  var tpls = gulp.src('client/directives/**/*.html')
//    .pipe(angularTemplatecache({
//      root: 'directives',
//      module: 'demo'
//    }));

//  var app = gulp.src('dist/client/app.js');

//  return sq({ objectMode: true }, app, views, tpls)
//    .pipe(concat('app.js'))
//    .pipe(ngAnnotate())
//    .pipe(uglify())
//    .pipe(gulp.dest('dist/client/'));
//});

//gulp.task('replace', function () {
//  return gulp.src('dist/client/index.html')
//    .pipe(replace(/\s*<script.*livereload.*><\/script>/, ''))
//    .pipe(gulp.dest('dist/client'));
//});

//gulp.task('rev', function () {

//  var rev = new revAll({
//    transformFilename: function (file, hash) {
//      var filename = path.basename(file.path);
//      if (revToExclude.indexOf(filename) !== -1) {
//        return filename;
//      }
//      toDelete.push(path.resolve(file.path));
//      var ext = path.extname(file.path);
//      return path.basename(file.path, ext) + '.' + hash.substr(0, 8) + ext;
//    }
//  });

//  return gulp.src('dist/client/**')
//    .pipe(rev.revision())
//    .pipe(gulp.dest('dist/client/'));
//});
