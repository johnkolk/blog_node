const gulp = require('gulp');
const plumber = require('gulp-plumber');
const removeSourcemap = require('gulp-remove-sourcemaps');
const gulpif = require('gulp-if');
const terser = require('gulp-terser');
const sourcemaps = require('gulp-sourcemaps');
const argv = require('yargs').argv;
const babel = require('gulp-babel');

module.exports = function script() {
    return gulp
        .src('src/js/**/*.js')
        .pipe(plumber())
        .pipe(gulpif(argv.development, sourcemaps.init()))
        .pipe(
            babel({
                ignore: ['src/assets/js/plugins/**'],
                presets: ['@babel/preset-env'],
            }),
        )
        .pipe(gulpif(argv.production, removeSourcemap()))
        .pipe(gulpif(argv.production, terser()))
        .pipe(gulpif(argv.development, sourcemaps.write()))
        .pipe(gulp.dest('public/js'));
};
