var gulp        = require('gulp'); 
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var notify      = require("gulp-notify");
var pug 		= require('gulp-pug');
var rename 		= require('gulp-rename');
var autoprefixer 		= require('gulp-autoprefixer');
gcmq 	  	 	 = require('gulp-group-css-media-queries');


// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
	});
});

gulp.task('styles', function() {
	// return gulp.src('app/'+syntax+'/**/*.'+syntax+'')
	return gulp.src('src/sass/**/*.sass')
	.pipe(sass({ outputStyle: 'expanded' }).on("error", notify.onError()))
	.pipe(rename({ suffix: '.min', prefix : '' }))
	.pipe(autoprefixer(['last 5 versions']))
	// .pipe(cleancss( {level: { 1: { specialComments: 0 } } })) // Opt., comment out when debugging
	.pipe(gulp.dest('src/css')) // папака в которую складывают уже готовые css стили
	.pipe(browserSync.stream())
});

gulp.task('pug', function(){
    return gulp.src(['src/pug/*.pug','!src/pug/_layouts/*.*'])
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('dist/'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('gcmq', async function () {
    gulp.src('src/css/main.min.css')
        .pipe(gcmq())
        .pipe(gulp.dest('dist/css/'));
});


gulp.task('watch', function() {
    gulp.watch(['src/sass/**/*.sass', './src/pug/modules/**/*.sass'], gulp.parallel('styles'));
    gulp.watch(['src/css/main.min.css'], gulp.parallel('gcmq'));
	gulp.watch('src/pug/**/*.pug', gulp.parallel('pug'));
});

gulp.task('default', gulp.parallel('styles', 'gcmq', 'pug', 'browser-sync', 'watch'));