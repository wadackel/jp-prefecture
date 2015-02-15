# require module
g = require "gulp"
$ = do require "gulp-load-plugins"


# banner setting
pkg = require "./package.json"
banner = [
  "/*!"
  " * <%= pkg.name %>"
  " * <%= pkg.description %>"
  " * @version <%= pkg.version %>"
  " * @license <%= pkg.license %>"
  " * @author <%= pkg.author.name %>"
  " * @url <%= pkg.homepage %>"
  " */"
].join "\n"


# path setting
path = {
  src: "./src"
  dest: "./"
  test: "./test"
}


# javascript
g.task "js", ->
  g.src path.src + "/**/*.js"
  .pipe $.plumber()
  .pipe $.jshint()
  .pipe $.header banner, {pkg: pkg}
  .pipe g.dest path.dest
  .pipe $.rename {extname: ".min.js"}
  .pipe $.uglify {preserveComments: "some"}
  .pipe g.dest path.dest


# test
g.task "test", ->
  g.src path.test + "/index.html"
  .pipe $.qunit()


# watch
g.task "watch", ->
  g.watch path.src + "/**/*.js", ["js"]
  g.watch path.test + "/*.js", ["test"]


# tasks
g.task "default", ["watch"]
g.task "build", ["js", "test"]
