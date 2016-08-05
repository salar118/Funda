'use strict';

var gulp = require('gulp');
var util = require('gulp-util');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var livereload = require('gulp-livereload');



///////CLIENT

//File path
var CLIENT_PUBLIC_PATH = 'client/public/';
var CSS_PATH =  CLIENT_PUBLIC_PATH +  'css/**/*.css';
var CSS_DIST_PATH =  CLIENT_PUBLIC_PATH + 'dist/css/';
var CLIENT_PUBLIC_DIST_PATH = 'client/public/dist/';
var CLIENT_SCRIPTS_PATH = CLIENT_PUBLIC_PATH +  'scripts/**/*.js';
var CLIENT_SCRIPTS_DIST_PATH =  CLIENT_PUBLIC_PATH + 'dist/js/';


//Styles
gulp.task('styles', ['cleanCss'], function(){
    util.log('Starting of task: styles');
    return gulp.src(CSS_PATH)
        .pipe(concat('styles.css'))
        .pipe(gulp.dest(CSS_DIST_PATH))
        .pipe(livereload());
});

gulp.task('cleanCss', function () {
    util.log('Starting of task: cleanCss');
    return gulp.src(CSS_DIST_PATH + '**/', {read: false})
        .pipe(clean());
});

//Scripts
gulp.task('scripts', ['cleanJs'], function(){
    util.log('Starting of task: scripts');
    return gulp.src(CLIENT_SCRIPTS_PATH)
        //only uglify if gulp is ran with '--type production'
        .pipe(util.env.type === 'production' ?  uglify() : util.noop())
        .pipe(gulp.dest(CLIENT_SCRIPTS_DIST_PATH))
        .pipe(livereload());

});

gulp.task('cleanJs', function () {
    util.log('Starting of task: cleanJs');
    return gulp.src(CLIENT_SCRIPTS_DIST_PATH + '**/', {read: false})
        .pipe(clean());
});

//Images
gulp.task('images', function(){
    util.log('Starting of task: styles');
});


//HTML
gulp.task('copyHtml', function () {
    util.log('Starting of task: copyHtml');
    return gulp.src(CLIENT_PUBLIC_PATH + '*.html')
        .pipe(gulp.dest(CLIENT_PUBLIC_DIST_PATH));
});

//clean
gulp.task('clean', function () {
    util.log('Starting of task: clean');
    return gulp.src(CLIENT_PUBLIC_DIST_PATH + '**/', {read: false})
        .pipe(clean());
});


///////SERVER


//default
gulp.task('default', ['clean', 'styles', 'copyHtml', 'scripts', 'images']);

//watch
gulp.task('watch', ['default'], function(){
    util.log('Starting of task: watch');
    util.log('Starting of task: watch>>' + CSS_PATH);
    require('./server.js');
    livereload.listen();
    gulp.watch(CSS_PATH, ['styles']);
    gulp.watch(CLIENT_SCRIPTS_PATH, ['scripts']);
});
