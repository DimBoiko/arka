const {src,dest,series} = require('gulp')
const htmlmin = require('gulp-htmlmin')
const sass = require('gulp-sass')(require('sass'))
const csso = require('gulp-csso')
const include = require('gulp-file-include')
const del = require('del')
const concat = require('gulp-concat')
const autoprefixer = require('gulp-autoprefixer')
const {watch} = require('gulp')
const fileinclude = require('gulp-file-include')
const sync = require('browser-sync').create()
const uglify = require('gulp-uglify-es').default
const babel = require('gulp-babel');
const ttf2woff = require('gulp-ttf2woff')
const ttf2woff2 = require('gulp-ttf2woff2')

function js(){
	return src('src/js/script.js')
	.pipe(dest('dist/js'))
}

// .pipe(babel({
// 	presets: ['@babel/env']
// }))
// .pipe(fileinclude())
// .pipe(uglify())

function html () {
	return src('src/**.html')
	.pipe(include({
		prefix:'@@'
	}))
	.pipe(dest('dist'))
	
	// .pipe(htmlmin({
	// 	collapseWhitespace:true
	// 
}

function scss () {
	return src('src/scss/style.scss')
	.pipe(sass())
	.pipe(autoprefixer({
		overrideBrowserslist:['last 2 versions']
	}))
	.pipe(csso())
	.pipe(concat('index.css'))
	.pipe(dest('dist/css'))
}

function images () {
	return src('src/img/**/*.{jpg,png,svg,gif,ico,webp}')
	.pipe(dest('dist/img'))
}
function fonts ( ) {
	src('src/fonts/**.ttf')
		.pipe(ttf2woff())
		.pipe(dest('dist/fonts'));
	return src('src/fonts/**.ttf')
		.pipe(ttf2woff2())
		.pipe(dest('dist/fonts'))
}

function clear () {
	return del('dist')
}

function serve () {
	 sync.init({
		notify: false,
		port:3000,
		server:{
			baseDir:'dist'
		}
	})
	watch('src/**.html',series(html)).on('change',sync.reload)
	watch('src/html/**.html',series(html)).on('change',sync.reload)
	watch('src/scss/**.scss',series(scss)).on('change',sync.reload)
	watch('src/js/**.js',series(js)).on('change',sync.reload)
	watch('src/img/**.{jpg,png,svg,gif,ico,webp}',series(images)).on('change',sync.reload)
	watch('src/fonts/**.ttf',series(fonts)).on('change',sync.reload)
}

exports.clear = clear
exports.start = series(clear,scss,html,js,images,fonts,serve)
exports.build = series(clear,scss,html,js,images,fonts)
