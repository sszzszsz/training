var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var plumber = require('gulp-plumber'); //強制停止を防止
var notify = require('gulp-notify'); //通知を表示
var browserSync = require('browser-sync'); //ブラウザシンク
var ssi = require('connect-ssi'); //ssi
var runSequence = require('run-sequence');
var crLfReplace = require ('gulp-cr-lf-replace');
var convertEncoding = require ('gulp-convert-encoding');
var pleeease = require('gulp-pleeease');
var cache = require('gulp-cached');
var jsmin = require('gulp-uglify');

var imagemin = require('gulp-imagemin'); // 画像圧縮
var pngquant = require('imagemin-pngquant'); // 圧縮率を高めるのにプラグインを入れる png
var mozjpeg = require('imagemin-mozjpeg'); // 圧縮率を高めるのにプラグインを入れる jpg

// paths
var srcDir = 'src';
var dstDir = 'htdocs';
var targetDir = '';
var targetPage = '';


// css
gulp.task('sass', function() {
  return gulp.src(srcDir + '/**/*.scss')
    .pipe(plumber({
      errorHandler: notify.onError('<%= error.message %>')
    }))
    .pipe(sass({
      outputStyle: 'expanded' // expanded: 展開 compressed : 圧縮
    }))
    .pipe(pleeease({
      rem: {rootValue: '10px'},
      autoprefixer: {
        browsers: ['iOS 10', 'Android 4.4', 'last 2 version']
      },
      opacity: false,
      minifier: false // 圧縮しない場合：false
    }))
    .pipe(cache())
    .pipe(crLfReplace({changeCode: 'CR+LF'}))// 改行コード変更
    .pipe(convertEncoding({to: 'UTF-8'})) // 文字コード変更
    .pipe(gulp.dest(dstDir))
});


// browserSync
gulp.task('browserSync', function() {
  return browserSync.init({
    server: {
      baseDir: dstDir, // ルートとなるディレクトリを指定
      port: 3001,
      middleware: [
        ssi({
          baseDir: dstDir,
          ext: '.html'
        })
      ]
    },
    startPath: 'index.html',
    open: 'external',
    notify: false
  });
});


//reload
gulp.task('reload', function() {
  browserSync.reload();
});


//watchタスク
gulp.task('watch', function() {
  watch("./**/*.scss", function(event) {
    gulp.start("sass");
  });
  watch(dstDir + '/**/*.*', function(event) {
    gulp.start("reload");
  });
  browserSync.reload();
});


// default /////////////////////////////////////
gulp.task('default', function(callback) {
  return runSequence(
    'browserSync',
    'sass',
    'watch',
    callback
  );
});

//js min
gulp.task("jsmin", function() {
  return gulp.src(srcDir + '/**/' + targetDir + '/**/*.js')
    .pipe(plumber())
    .pipe(jsmin())
    .pipe(gulp.dest(dstDir))
    .pipe(notify('js minify finished'))
});


//imagemin
gulp.task('imgmin', function() {
  return gulp.src(srcDir + '/**/' + targetDir + '/**/*.{jpg,jpeg,png,gif}')
    .pipe(plumber())
    .pipe(imagemin([
      pngquant({
        quality: '60-80',
        speed: 1,
        floyd: 0
      }),
      mozjpeg({
        quality: 85,
        progressive: true
      }),
      imagemin.svgo(),
      imagemin.optipng(),
      imagemin.gifsicle()
    ]))
    .pipe(notify('image minified'))
    .pipe(gulp.dest(dstDir))
    .pipe(notify('image minify finished'))
});


// minify /////////////////////////////////////
gulp.task('minify', function(callback) {
  return runSequence(
    'jsmin',
    'imgmin',
    callback
  );
});