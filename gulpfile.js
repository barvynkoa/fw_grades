var gulp = require('gulp');
var gutil = require('gulp-util');
var gulpsync = require('gulp-sync')(gulp);
var typescript = require('gulp-typescript');
var runSequence = require('run-sequence');
var del = require('del');
var sourcemaps = require('gulp-sourcemaps');
var configGame = require('yargs');
var merge = require('merge2');
var nunjucksRender = require('gulp-nunjucks-render');
/*var tscAutoref = require('gulp-tsc-autoref2');
var runSequence = require('run-sequence');
var clean = require('gulp-clean');
var minify = require('gulp-minify');
var replace = require('gulp-replace');
*/

//this variable will be edited by the game gulp task
configGame.gameName = "";
var gameName = "";
gulp.task('setReleaseVariable', function () {
    configGame.gameName = 'first_game';//process.argv["gameName"];
    //configGame.gameName = 'first_game';//process.argv["gameName"];
});


gulp.task('default', function (done) {
    runSequence('test', function () {
        done();
    });
});

gulp.task('sayHello', function () {

    console.log('hello');
    process.stdout.write('hello');
    gutil.log("hello");
});

gulp.task('clean-build', function() {
    return del(["_build/" + configGame.gameName + "/"]);
}.bind(this));

gulp.task('buildJsTheGame', function () {
    var tsResult = gulp.src([
        '_lib/scripthost/scripthost.d.ts',
        '_lib/fontfaceobserver/fontfaceobserver.d.ts',
        '_lib/phaser/phaser.d.ts',
        '_lib/lodash/lodash.d.ts',
        '_lib/sweeter_core/sweet-core.d.ts',
        'sources/'+configGame.gameName+'/**/*.ts'
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
            out: 'game.js'
        }));

    return merge([
        tsResult.js
            .pipe(sourcemaps.write("./", {
                includeContent: false,
                sourceRoot: '../../../'
            }))
            .pipe(gulp.dest('_build/'+configGame.gameName + '/src/'))
    ]);
});

gulp.task('buildCore', function () {
    var tsResult = gulp.src([
        '_lib/scripthost/scripthost.d.ts',
        '_lib/fontfaceobserver/fontfaceobserver.d.ts',
        '_lib/phaser/phaser.d.ts',
        '_lib/lodash/lodash.d.ts',
        'core/src/**/*.ts'
    ])
        .pipe(sourcemaps.init())
        .pipe(typescript({
            declaration: true,
            target: "es5",
            "lib": [
                "dom",
                "es6"
            ],
            removeComments: true,
            noImplicitAny: true,
            suppressImplicitAnyIndexErrors: true,
            out: 'sweet-core.js'
        }));

    return merge([
        tsResult.dts
            .pipe(gulp.dest('_lib/sweeter_core/')),
        tsResult.js
            .pipe(sourcemaps.write("./", {
                includeContent: false,
                sourceRoot: './../../'
            }))
            .pipe(gulp.dest('_lib/sweeter_core/'))
    ]);
});

gulp.task("copyGrahics", function () {
    return gulp.src("development/assets/_template/img/**/*.*")
        .pipe(gulp.dest("_build/"+configGame.gameName + "/img/"));
});

gulp.task("copyCss", function () {
    return gulp.src("development/assets/_template/css/**/*.*")
        .pipe(gulp.dest("_build/"+configGame.gameName + "/css/"));
});

gulp.task("copyConfig", function () {
    return gulp.src("development/assets/_template/config/**/*.*")
        .pipe(gulp.dest("_build/"+configGame.gameName + "/config/"));
});

gulp.task("copyHtml", function () {
    return gulp.src("development/assets/_template/html/index.html")
        .pipe(gulp.dest("_build/"+configGame.gameName + "/"));
});

gulp.task("copyPhaser", function () {
    return gulp.src(["node_modules/phaser/build/phaser.js","node_modules/phaser/build/phaser.map"])
        .pipe(gulp.dest("_build/"+configGame.gameName + "/src/"));
});

gulp.task("copyLodash", function () {
    return gulp.src(["_lib/lodash/lodash.min.js"])
        .pipe(gulp.dest("_build/"+configGame.gameName + "/src/"));
});

gulp.task("copyGameAssets", function () {
    return gulp.src(["development/assets/"+configGame.gameName + "/**/*.*", "!development/assets/"+configGame.gameName + "/config/"])
        .pipe(gulp.dest("_build/"+configGame.gameName + "/"));
});


gulp.task("copyMergeGameAssets", function () {
    return gulp.src("development/assets/"+configGame.gameName + "/config/**/*.*") //path to the game
        .pipe(nunjucksRender({
            path: ["development/assets/_template/config/"], //path to the template
            ext: "",
            inheritExtension: true
        }))
        .pipe(gulp.dest("_build/"+configGame.gameName + "/config/")); // destination path
});


gulp.task('test', gulpsync.sync([
    "setReleaseVariable",
    'clean-build',
    "buildCore",
    "buildJsTheGame",
    "copyGrahics",
    "copyCss",

    //"copyConfig",
    "copyGameAssets",
    "copyMergeGameAssets",
    "copyHtml"
]));

module.exports = gulp;
