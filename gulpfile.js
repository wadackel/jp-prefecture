var gulp = require("gulp"),
		rimraf = require("rimraf"),
    $ = require("gulp-load-plugins")({
      pattern: ["gulp-*", "gulp.*"],
      replaceString: /\bgulp[\-.]/
    });

var pkg = require("./package.json"),
		banner = [
			"/*!",
			" * <%= pkg.name %>",
			" * <%= pkg.description %>",
			" * @version <%= pkg.version %>",
			" * @license <%= pkg.license %>",
			" * @author <%= pkg.author %>",
			" * @url <%= pkg.homepage %>",
			" */",
		].join("\n");

var path = {
	src: "src",
	dest: "dist"
};


gulp.task("js", function(){
	gulp.src(path.src + "/**/*.js")
		.pipe($.plumber())
		.pipe($.jshint())
		.pipe($.header(banner, {pkg: pkg}))
		.pipe(gulp.dest(path.dest))
		.pipe($.rename({
			extname: ".min.js"
		}))
		.pipe($.uglify({
			preserveComments: "some"
		}))
		.pipe(gulp.dest(path.dest));
});

gulp.task("clean", function(cd){
	rimraf(path.dest, cd);
});

gulp.task("watch", function(){
	gulp.watch(path.src + "/**/*.js", ["js"]);
});

gulp.task("build", ["clean", "js"]);