const gulp = require('gulp');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const gulpif = require('gulp-if');
const argv = require('yargs').argv;
const rename = require('gulp-rename');

let mainStyle = () => {
    return gulp
        .src('src/scss/main.scss')
        .pipe(plumber())
        .pipe(gulpif(argv.development, sourcemaps.init()))
        .pipe(
            sass({
                includePaths: ['node_modules'],
            }),
        )
        .pipe(
            autoprefixer({
                cascade: false,
            }),
        )
        .pipe(
            gulpif(
                argv.production,
                cleanCSS(
                    {
                        debug: true,
                        compatibility: '*',
                    },
                    (details) => {
                        console.log(
                            `${details.name}: Original size:${details.stats.originalSize} - Minified size: ${details.stats.minifiedSize}`,
                        );
                    },
                ),
            ),
        )
        .pipe(gulpif(argv.development, sourcemaps.write()))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('public/css'));
};

let vendorStyle = function () {
    return gulp
        .src('src/scss/vendors.scss')
        .pipe(plumber())
        .pipe(
            sass({
                includePaths: ['node_modules'],
                outputStyle: 'compressed',
            }),
        )
        .pipe(
            cleanCSS(
                {
                    level: { 1: { specialComments: 0 } },
                    debug: true,
                    compatibility: '*',
                },
                (details) => {
                    console.log(
                        `${details.name}: Original size:${details.stats.originalSize} - Minified size: ${details.stats.minifiedSize}`,
                    );
                },
            ),
        )
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('public/css'));
};

// module.exports = gulp.parallel(mainStyle, vendorStyle);
module.exports = mainStyle;
