const gulp = require('gulp')
const cleanCSS = require('gulp-clean-css')
const rename = require("gulp-rename")
const sass = require("gulp-sass")

const path = {
	scss: './scss/style.scss',
	allScss: './scss/**/*.scss',
	dist: './dist',
	fileName: 'style.min.css'
}

// Build dist
gulp.task('build', () => {
	return gulp.src(path.scss)
		.pipe(sass().on('error', sass.logError))
		.pipe(cleanCSS())
		.pipe(rename(path.fileName))
		.pipe(gulp.dest(path.dist))
})

// Watch
gulp.task('watch', () => {
	return gulp.watch(path.allScss, gulp.series('build'))
})

// Default task
gulp.task('default', gulp.series('build', 'watch'))

