const gulp = require('gulp');
const ts = require('gulp-typescript');
const clean = require('gulp-clean');

const _build_dir = 'dist';

const project = ts.createProject('tsconfig.json');

gulp.task('scripts', () => {
    const tsResult = project.src().pipe(project());
    return tsResult.js.pipe(gulp.dest(_build_dir));
});

gulp.task('watch', gulp.series('scripts', () => {
    return gulp.watch('src/**/*.ts', gulp.series('scripts', () => {}));
}));

gulp.task('clean-scripts', () => {
    return gulp.src(_build_dir, {read: false}).pipe(clean());
});


gulp.task('build', gulp.series('scripts'));