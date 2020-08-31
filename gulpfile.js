const gulp = require('gulp');
// const debug = require('gulp-debug');
const styles = require('./gulp/styles');
// const clean = require('./gulp/clean');
// const script = require('./gulp/script');

function clean(cb) {
    // body omitted
    cb();
}

exports.default = gulp.series(clean, styles);

// const tasks = gulp.parallel(styles, script);
// module.exports.dev = gulp.series(clean, tasks);
// module.exports.build = gulp.series(clean, tasks);
