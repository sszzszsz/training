var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber'); //強制停止を防止
var notify = require('gulp-notify'); //通知を表示
var connect = require('gulp-connect'); //ローカルサーバ立ち上げ
var browserSync = require('browser-sync'); //ブラウザシンク
var ssi = require('connect-ssi'); //ssi

var csscomb = require('gulp-csscomb'); // css整形
var autoprefixer = require('gulp-autoprefixer'); // ベンダープレフィックス付与
var cache = require('gulp-cached');
var cssmin = require('gulp-clean-css'); // css圧縮
var jsmin = require('gulp-uglify'); // js圧縮

var imagemin = require('gulp-imagemin'); // 画像圧縮
var pngquant = require('imagemin-pngquant'); // 圧縮率を高めるのにプラグインを入れる png
var mozjpeg = require('imagemin-mozjpeg'); // 圧縮率を高めるのにプラグインを入れる jpg

// paths 
var paths = {
  srcDir: 'src',
  dstDir: 'htdocs'
}
var srcGlob = paths.srcDir; //開発環境
var dstGlob = paths.dstDir; //コンパイル先

// css 
gulp.task('sass', function() {
  gulp.src(['src/**/*.scss', '!src/**/component/*.scss'])
    .pipe(plumber({ // デスクトップに通知を出す
      errorHandler: notify.onError('<%= error.message %>')
    }))
    .pipe(autoprefixer(['last 2 versions']))
    .pipe(autoprefixer({ grid: true }))
    .pipe(csscomb())
    .pipe(sass({
      outputStyle: 'expanded'
    }))
    .pipe(cache())
    .pipe(gulp.dest(dstGlob))
});

//server 
gulp.task('connect', function() {
  connect.server({
    root: paths.dstDir, //ルートディレクトリ
    livereload: true //ライブリロード
  });
});

// browserSync
gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: paths.dstDir, // ルートとなるディレクトリを指定
      middleware: [
        ssi({
          baseDir: dstGlob,
          ext: '.html'
        })
      ]
    }
  });
});

//reload
gulp.task('reload', function() {
  gulp.src(paths.dstDir + '/**/*.css').pipe(connect.reload());
  gulp.src(paths.dstDir + '/**/*.html').pipe(connect.reload());
  browserSync.reload();
});

//watchタスク
gulp.task('watch', function() {
  gulp.watch(paths.srcDir + '/**/*.scss', ['sass']);
  gulp.watch(dstGlob + '/**/*.*', ['reload']);
  browserSync.reload();
});

/// default ////////////////////////////////////////////
gulp.task('default', ['watch', 'browserSync']);


/// css comb ////////////////////////////////////////////
gulp.task('csscomb', function() {
  gulp.src(['../scss/**/*.scss'])
    .pipe(autoprefixer(
      ['last 2 versions']
    ))
    .pipe(csscomb())
    .pipe(gulp.dest('../css/'))
});

/// css min ////////////////////////////////////////////
gulp.task("cssmin", function() {
  var srcGlob = paths.srcDir + '/**/*.css';
  var dstGlob = paths.dstDir;
  gulp.src(srcGlob)
    .pipe(cssmin())
    .pipe(gulp.dest(dstGlob));
});

/// js min ////////////////////////////////////////////
gulp.task("jsmin", function() {
  var srcGlob = paths.srcDir + '/**/*.js';
  var dstGlob = paths.dstDir;
  gulp.src(srcGlob)
    .pipe(jsmin())
    .pipe(gulp.dest(dstGlob));
});

/// imagemin ////////////////////////////////////////////
gulp.task('imagemin', function() {
  var srcGlob = paths.srcDir + '/**/*.+(jpg|jpeg|png|gif)';
  var dstGlob = paths.dstDir;
  gulp.src(srcGlob)
    .pipe(imagemin([
      pngquant({
        quality: '60-80',
        speed: 1,
        floyd: 0
      }),
      imagemin.jpegtran({
        quality: 85,
        progressive: true
      })
    ]))
    .pipe(imagemin())
    .pipe(gulp.dest(dstGlob))
    .pipe(notify('images task finished'));
});