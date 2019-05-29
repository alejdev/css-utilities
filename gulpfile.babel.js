import { task, src, dest, watch, series } from 'gulp'
import cleanCSS from 'gulp-clean-css'
import rename from 'gulp-rename'
import sass, { logError } from 'gulp-sass'
import sassLint, { format, failOnError } from 'gulp-sass-lint'

const path = {
	scss: './scss/style.scss',
	allScss: './scss/**/*.scss',
	dist: './dist',
	fileName: 'style.css',
	fileMinName: 'style.min.css',
	configLint: './.sass-lint.yml'
}

/**
 * Compile SCSS to .css or min.css
 * @param {boolean} min Minify CSS?
 */
function compileSass(min) {
	let sc = src(path.scss).pipe(sass().on('error', logError))
	return min ?
		sc.pipe(cleanCSS()).pipe(rename(path.fileMinName)).pipe(dest(path.dist)) :
		sc.pipe(rename(path.fileName)).pipe(dest(path.dist))
}

// Build dist
task('build', () => {
	compileSass()
	return compileSass(true)
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
