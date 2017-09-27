'use strict';

module.exports = function() {
  $.gulp.task('scss', function() {
    return $.gulp.src('./source/styles/main.scss')
      .pipe($.gp.sassGlob())
      .pipe($.gp.if($.dev, $.gp.sourcemaps.init()))
      .pipe($.gp.sass()).on('error', $.gp.notify.onError({ title: 'Style' }))
      .pipe($.gp.autoprefixer({ browsers: $.config.autoprefixerConfig }))
      .pipe($.gp.cssUnit({
        type     :    'px-to-rem',
        rootSize :    16
      }))
      .pipe($.gp.if(!$.dev, $.gp.csso()))
      .pipe($.gp.if($.dev, $.gp.sourcemaps.write()))
      .pipe($.gp.if(!$.dev, $.gp.rename({ suffix: '.min' })))
      .pipe($.gulp.dest($.config.root + '/assets/css'))
      .pipe($.browserSync.stream());
  });
};
