var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var plugins = gulpLoadPlugins();
var runSequence = require('run-sequence');
var wiredep = require('wiredep').stream;
var karma = require('karma').server;

var config = {
    srcDir : 'src',
    destDir : 'dist',
    workingDir : './',
    indexFile : 'index.html',
    views: ['src/**/*.html', '!src/index.html'],
    scripts : ['src/**/*.js', '!src/services/**/*.js'],
    assetsDir: 'src/assets',
    sassDir : 'src/assets/sass',
    cssDir : 'src/assets/css',
    templatesFile : 'template.min.js',
    // Sample sass-include path for a bower component
    sassIncludePaths : ['bower_components/bootstrap-sass-official/assets/stylesheets']
};

gulp.task('jshint', function(){
    return gulp.src(config.scripts)
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter('default'))
        .pipe(plugins.jshint.reporter('fail'))
});

gulp.task('compile-sass', function(){
    return gulp.src(config.sassDir+'/**/*.scss')
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.sass({includePaths:config.sassIncludePaths}))
        .pipe(plugins.sourcemaps.write(config.workingDir))
        .pipe(gulp.dest(config.cssDir));
});

gulp.task('usemin', function () {
    return gulp.src(config.indexFile)
        .pipe(plugins.usemin({
            css: [plugins.minifyCss(), 'concat'],
            js: [plugins.uglify({mangle: false}),plugins.rev()]
        }))
        .pipe(gulp.dest(config.destDir));
});

// Injects dev-dependencies
gulp.task('inject', function(){
    return gulp.src(config.indexFile)
        .pipe(wiredep({bowerJson: require('./bower.json')}))
        .pipe(plugins.inject(gulp.src(config.scripts, { read: false}), { relative: true } ))
        .pipe(plugins.inject(gulp.src(config.cssDir+'/**/*.css', { read: false}),{ relative: true } ))
        .pipe(gulp.dest(config.workingDir));
});

gulp.task('build-templates', function(){
    return gulp.src(config.views)
        .pipe(plugins.htmlmin({collapseWhitespace:true}))
        .pipe(plugins.ngTemplates({
            filename: config.templatesFile,
            module: 'com.fianbakken.angular.bootstrap.web.templates',
            path: function(path, base){
                return path.replace(base, 'src/');
            }
        }))
        .pipe(gulp.dest(config.destDir));
});

gulp.task('inject-templates', function(){
    return gulp.src(config.destDir+'/'+config.indexFile)
        .pipe(plugins.inject(gulp.src(config.destDir+'/'+config.templatesFile, {read:false}), {name:'templates', relative: true}))
        .pipe(gulp.dest(config.destDir));
});

gulp.task('clean', function(){
    return gulp.src(config.destDir+'/**/*.*', {read: false})
        .pipe(plugins.rimraf());
});

gulp.task('run-tests', function(done){
    // TODO
/*    karma.start({
        configFile:  __dirname+'/test/karma.conf.js',
        singleRun: true
    }, done());

    */
    done();
});

gulp.task('copy-resources', function(){
    return gulp.src([config.assetsDir+'/fonts/**', config.assetsDir+'/images/**',config.indexFile])
        .pipe(gulp.dest(config.destDir));
});

gulp.task('build-dist', ['build-dev','copy-resources','build-templates'],function(){
    runSequence('usemin','inject-templates')
});

gulp.task('build-dev', ['clean','compile-sass'], function(cb){
    runSequence(['jshint','run-tests','inject']);
    cb();
});

// Skips jshint and tests (test are run seperate in mvn task)
gulp.task('build-jenkins', ['clean','copy-resources','compile-sass','build-templates'],function(){
    runSequence('inject','usemin','inject-templates')
});

gulp.task('watch', function(){
    gulp.watch(config.scripts, ['build-dev']);
    gulp.watch([config.sassDir+'**/*.scss'], ['compile-sass', 'inject'])
});

function connect(target){
    return gulp.src(target)
        .pipe(plugins.webserver({
            port: 1984,
            livereload: true,
            path: '/',
            open: true,
            proxies: [
                {
                    source: '/webresources/',
                    target: 'http://localhost:8081/webresources/'
                }
            ]
        }));
}
gulp.task('connect', function(){
    return connect(config.workingDir);
});
gulp.task('connect-dist', ['watch'], function () {
    return connect(config.destDir);
});

gulp.task('default', ['build-dist']);