import { task, src, dest, watch, series } from 'gulp'
import cleanCSS from 'gulp-clean-css'
import rename from 'gulp-rename'
import sass, { logError } from 'gulp-sass'
import sassLint, { format, failOnError } from 'gulp-sass-lint'

const path = {
	scss: './scss/style.scss',
	allScss: './scss/**/*.scss',
	dist: './dist',
	fileName: 'style.min.css',
	configLint: './.sass-lint.yml'
}

// Build dist
task('build', () => {
	return src(path.scss)
		.pipe(sass().on('error', logError))
		.pipe(cleanCSS())
		.pipe(rename(path.fileName))
		.pipe(dest(path.dist))
})

// Lint
task('lint', () => {
	return src(path.allScss)
		.pipe(sassLint({ configFile: path.configLint }))
		.pipe(format())
		.pipe(failOnError())
})

// Watch
task('watch', () => {
	return watch(path.allScss, series('build', 'lint'))
})

// Default task
task('default', series('build', 'lint', 'watch'))
