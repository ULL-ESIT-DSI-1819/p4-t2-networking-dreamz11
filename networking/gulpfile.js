

var gulp = require("gulp");
var shell = require("gulp-shell");


gulp.task('sendm',shell.task("node test-json-service.js"));
gulp.task('watch',shell.task("watch -n 5 touch target.txt"));
gulp.task('nc',shell.task("nc localhost 60300"));
gulp.task('server',shell.task("node net-watcher.js target.txt"));
gulp.task('client',shell.task("node net-watcher-ldj-client.js"))
gulp.task('documentation',shell.task("documentation build *.js -f md -o documentation.md"));
