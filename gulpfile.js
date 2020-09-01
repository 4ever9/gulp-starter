const {src, dest, watch, parallel, series} = require('gulp');
const connect = require('gulp-connect');
const sass = require('gulp-sass');
sass.compiler = require('node-sass');

function serve() {
    return connect.server({
        root: '.',
        livereload: true,
        port: 3030
    });
}

function compileScss() {
    return src('./src/scss/**/*.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(dest('./dist'))
        .pipe(connect.reload());
}

exports.default = series(parallel(compileScss), function () {
    watch('./*.scss', compileMox)
})

exports.dev = series(parallel(compileScss), parallel(serve, function () {
    watch('./*.scss', compileScss)
    watch('./*.html', function () {
        return src('./*.html')
            .pipe(dest('./'))
            .pipe(connect.reload());
    })
}))