var gulp = require('gulp');
var gutil = require('gulp-util');
var gulpsync = require('gulp-sync')(gulp);
var typescript = require('gulp-typescript');
var runSequence = require('run-sequence');
var del = require('del');
var sourcemaps = require('gulp-sourcemaps');
var configGame = require('yargs');
var merge = require('merge2');
/*var tscAutoref = require('gulp-tsc-autoref2');
var runSequence = require('run-sequence');
var clean = require('gulp-clean');
var minify = require('gulp-minify');
var replace = require('gulp-replace');
*/

//this variable will be edited by the game gulp task
configGame.gameName = "";

gulp.task('setReleaseVariable', function () {
    configGame.gameName = 'simple_game';//process.argv["gameName"];
});

gulp.task('default', function (done) {
    runSequence('sayHello', function () {
        done();
    });
});

gulp.task('sayHello', function () {

    console.log('hello');
    process.stdout.write('hello');
    gutil.log("hello");
});

gulp.task('clean-build', function() {
    return del(['_build']);
});

gulp.task('buildJsTheGame', function () {
    var tsResult = gulp.src([
        './_lib/*.d.ts',
        './core/**/*.ts',
        './sources/simple_game/**/*.ts'
    ])
        .pipe(sourcemaps.init())
        .pipe(typescript({
            declaration: false,
            target: "es5",
            "lib": [
                "dom",
                "es6"
            ],
            removeComments: true,
            noImplicitAny: true,
            suppressImplicitAnyIndexErrors: true,
            out: '_build/'+configGame.gameName+'game.js'
        }));

    return merge([
        tsResult.js
            .pipe(sourcemaps.write("./", {
                includeContent: false,
                sourceRoot: './sources/'
            }))
            .pipe(gulp.dest('_build/'+configGame.gameName))
    ]);
});

gulp.task("copyGrahics", function () {
    return gulp.src(configGame.pathToTheGame + "graphicsSprite/**/*.*")
        .pipe(gulp.dest(configGame.absolutePath + configGame.pathWhereToRelease + configGame.gameName + "/" + configGame.gameName + "/" + "graphicsSprite/"));
});

gulp.task('test', gulpsync.sync(["setReleaseVariable"]));
