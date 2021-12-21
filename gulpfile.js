const { pipe }=require('stdout-stream');
//const exports=require('webpack');
const { util }=require('webpack');


const { src,dest,watch,parallel,series }=require('gulp'),

	scss=require('gulp-sass')(require('sass')),

	concat=require('gulp-concat'),
	browserSync=require('browser-sync').create(),
	uglify=require('gulp-uglify-es').default,
	imagemin=require('gulp-imagemin'),
	del=require('del'),
	notify=require('gulp-notify'),
	sourcemaps=require('gulp-sourcemaps'),
	cleanCSS=require('gulp-clean-css'),
	fileInclude=require('gulp-file-include'),
	svgSprite=require('gulp-svg-sprite'),
	ttf2woff=require('gulp-ttf2woff'),
	ttf2woff2=require('gulp-ttf2woff2'),
	webpack=require('webpack'),
	webpackStream=require('webpack-stream'),
	tinypng=require('gulp-tinypng-compress'),
	autoprefixer=require('gulp-autoprefixer'),
	rename=require('gulp-rename'),
	gutil=require('gulp-util'),
	ftp=require('vinyl-ftp');
	


const webpackConfig=require('./webpack.config');

//const server =require('./server')

const libCSS=() => {
	return src('src/vendor/normalize/normalize.css')
		.pipe(sourcemaps.init())
		.pipe(scss(
			{
				outputStyle: 'compressed'
			}
		).on('error',notify.onError("Error: <%= error.message %>")))
		.pipe(concat("libs.min.css"))

		.pipe(autoprefixer({
			overrideBrowserslist: ['last 10 version'],
			grid: true
		}))
		.pipe(cleanCSS({
			level: 2
		}))
		.pipe(sourcemaps.write('.'))
		.pipe(dest('app/css'))


}
const libCSSDist=() => {
	return src('src/vendor/normalize/normalize.css')

		.pipe(scss(
			{
				outputStyle: 'compressed'
			}
		).on('error',notify.onError("Error: <%= error.message %>")))
		.pipe(concat("libs.min.css"))

		.pipe(autoprefixer({
			overrideBrowserslist: ['last 10 version'],
			grid: true
		}))
		.pipe(cleanCSS({
			level: 2
		}))

		.pipe(dest('dist/css'))


}

const styles=() => {
	return src('src/scss/**/*.scss')
		.pipe(sourcemaps.init())
		.pipe(scss(
			{
				outputStyle: 'compressed'
			}
		).on('error',notify.onError("Error: <%= error.message %>")))
		.pipe(concat("style.min.css"))

		.pipe(autoprefixer({
			overrideBrowserslist: ['last 10 version'],
			grid: true
		}))
		.pipe(cleanCSS({
			level: 2
		}))
		.pipe(sourcemaps.write('.'))
		.pipe(dest('app/css'))

		.pipe(browserSync.stream())
}


const imgToApp=() => {
	return src(['src/img/**/*.{jpg,jpeg,png,gif,webp,avif}',
		'src/img/**/*.svg',
		'!src/img/sprites',
		'!src/img/sprites/**/*'],{ base: 'src/img' })
		.pipe(dest('app/img'));
}
const imgToDist=() => {
	return src(['app/img/**/*.{webp,avif,svg}'],{ base: 'app/img' })
		.pipe(dest('dist/img'));
}


const resourcesToApp=() => {
	return src(['src/resources/**/*.*',
	])
		.pipe(dest('app'));
}

const img=() => {
	return src('app/img/**/*.{jpg,jpeg,png,gif}')
		.pipe(imagemin(
			[
				imagemin.gifsicle({ interlaced: true }),
				imagemin.mozjpeg({ quality: 75,progressive: true }),
				imagemin.optipng({ optimizationLevel: 5 }),
				imagemin.svgo({
					plugins: [
						{ removeViewBox: true },
						{ cleanupIDs: false }
					]
				})
			]
		)
		)
		.pipe(dest('dist/img'))
}

const fonts=() => {
	src(['src/fonts/*.ttf'])
		.pipe(ttf2woff())
		.pipe(dest('app/fonts/'))
	src(['src/fonts/*.ttf'])
		.pipe(ttf2woff2())
		.pipe(dest('app/fonts/'))
	return src(['src/fonts/*.{woff,woff2,OTF}'])
		.pipe(dest('app/fonts/'))
}

const svgSprites=() => {

	return src('src/img/sprites/*.svg')
		.pipe(svgSprite({
			mode: {
				stack: {
					sprite: "../sprite.svg"
				}
			}
		}))
		.pipe(dest('app/img'))
}


const htmlInclude=() => {
	return src('src/*.html')
		.pipe(fileInclude({
			prefix: '@@',
			basepath: '@file'
		}))
		.pipe(dest('app'))
		.pipe(browserSync.stream())
}

/* add if needed libs*/

const libJS=() => {
	return src([''])
		.pipe(sourcemaps.init())
		.pipe(concat('libs.min.js'))
		.pipe(uglify())
		.pipe(sourcemaps.write('.'))
		.pipe(dest('app/js'))

}
const libJSDist=() => {
	return src([''])
		.pipe(sourcemaps.init())
		.pipe(concat('libs.min.js'))
		.pipe(uglify())
		.pipe(sourcemaps.write('.'))
		.pipe(dest('dist/js'))

}

/* -add if needed libs- */

const scripts=() => {
	return src(['src/js/*.js'])
		.pipe(webpackStream(webpackConfig))

		.pipe(sourcemaps.init())
		.pipe(uglify().on('error',notify.onError()))
		.pipe(rename({
			suffix: ".min"
		}))
		.pipe(sourcemaps.write('.'))
		.pipe(dest('app/js/'))
		.pipe(browserSync.stream())

}

const stylesBuild=() => {
	return src('src/scss/**/*.scss')

		.pipe(scss(
			{
				outputStyle: 'compressed'
			}
		).on('error',notify.onError("Error: <%= error.message %>")))
		.pipe(concat("style.min.css"))

		.pipe(autoprefixer({
			overrideBrowserslist: ['last 10 version'],
			grid: true
		}))
		.pipe(cleanCSS({
			level: 2
		}))

		.pipe(dest('dist/css'))
}

const scriptsBuild=() => {
	return src(['src/js/*.js'])
		.pipe(webpackStream(webpackConfig))


		.pipe(uglify().on('error',notify.onError()))
		.pipe(rename({
			suffix: ".min"
		}))

		.pipe(dest('app/js/'))

}


const tinypngf=() => {
	return src(['src/img/**/*.{png,jpg,jpeg}'])
		.pipe(tinypng({
			key: 'bCyZdt2Xc2mQLhbZKDW0JjMr9xxcFdJ7',
			sigFile: 'img/.tinypng-sigs',
			log: true,
			parallelMax: 50
		}))
		.pipe(dest('dist/img'));
}


const build=() => {
	return src([

		'app/fonts/**/*',
		'app/img/**/*.{webp,avif,svg}',
		'app/*.*'

	],{ base: 'app' })
		.pipe(dest('dist'))

}

//watch('./src/img/**.{jpg,jpeg,png,gif,webp}', imgToApp);
function watching() {
	watch('app/index.html').on('change',htmlInclude);
	watch('app/scss/**/*.scss',styles);
	watch(['app/js/**/*.js','!app/js/main.min.js'],scripts);

	watch('app/fonts/*.ttf',fonts)

}

const browsersync=() => {

	browserSync.init({
		server: {
			baseDir: "app/"
		}
	})

}

const watchFiles=() => {
	/* 	browserSync.init({
			server: {
				baseDir: "app/"
			}
	
		}) */
	watch('src/scss/**/*.scss',styles);
	watch('src/blocks/**/*.scss',styles);
	watch(['src/*.html'],htmlInclude);

	watch(['src/includes/*.html'],htmlInclude);
	watch('src/img/**/*.{jpg,jpeg,png,gif,webp,avif}',imgToApp);

	watch(['src/img/**/*.svg','!app/img/svg','!src/img/svg/**/*'],imgToApp),
		watch('src/img/sprites/*.svg',svgSprites);
	watch('src/resources/**/*.*',resourcesToApp);
	watch('src/fonts/*.ttf',fonts);
	watch(['src/js/**/*.js'],scripts);
	watch(['src/blocks/**/*.js'],scripts);
}

const clean=() => {
	return del('app/*')
}
const cleanDist=() => {
	return del('dist/*')
}

exports.libCSS=libCSS;
exports.libCSSDist=libCSSDist;
exports.styles=styles;
exports.stylesBuild=stylesBuild;
exports.watching=watching;
exports.libJS=libJS;
exports.scripts=scripts;
exports.img=img;
exports.svgSprites=svgSprites;
exports.htmlInclude=htmlInclude;
exports.tinypngf=tinypngf;

exports.imgToApp=imgToApp;
exports.imgToDist=imgToDist;
exports.resourcesToApp=resourcesToApp;
exports.clean=clean;
exports.cleanDist=cleanDist;
exports.browsersync=browsersync;

exports.watchFiles=watchFiles;



exports.build=series(cleanDist,scriptsBuild,libCSSDist,stylesBuild,imgToDist,img,build);
/* exports.default=parallel(htmlInclude,scripts,fonts,styles,browsersync,watching) */

exports.default=series(clean,parallel(htmlInclude,scripts,imgToApp,svgSprites,resourcesToApp,fonts),libCSS,styles,parallel(browsersync,watchFiles))