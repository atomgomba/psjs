var gulp = require("gulp"),
    coffee = require("gulp-coffee"),
    rename = require("gulp-rename"),
    uglify = require("gulp-uglify"),
    del = require("del"),
    runSequence = require("run-sequence");

var BUILD_DIR = "./build",
    DIST_DIR = "./dist",
    BUILD_MODULE = BUILD_DIR + "/psjs.js",
    SRC_COFFEE = [
        "./src/**/*.coffee",
    ];

gulp.task('build:compile', function() {
    return gulp.src(SRC_COFFEE)
        .pipe(coffee())
        .pipe(gulp.dest(BUILD_DIR));
});

gulp.task('build:uglify', function() {
    return gulp.src(BUILD_MODULE)
        .pipe(uglify())
        .pipe(rename({ extname: ".min.js" }))
        .pipe(gulp.dest(BUILD_DIR));
});

gulp.task('build:dist', function() {
    return gulp.src(BUILD_DIR + "/*.js")
        .pipe(gulp.dest(DIST_DIR));
});

gulp.task('build', function() {
    runSequence('build:compile', 'build:uglify');
});

gulp.task('clean', function() {
    del(BUILD_DIR);
});

gulp.task("watch", function() {
    function rebuild()
    {
        gulp.start("build")
            .on('error', function(error) {
                console.error(error.toString());
                this.emit("end");
            })
            .on("end", function() { gulp.start("clean"); });
    }

    rebuild();

    gulp.watch(SRC_COFFEE, rebuild)
        .on('error', function(error) {
            console.error(error.toString());
            this.emit("end");
        });
});
