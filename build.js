'use strict';

var fs = require('fs');
var mkdirp = require('mkdirp');
var cpr = require('cpr');
var chalk = require('chalk');
var jade = require('jade');
var stylus = require('stylus-renderer');
var autoprefixer = require('autoprefixer-stylus');
var UglifyJS = require('uglify-js');

var jadeOptions = {
  pretty: true
};

var stylusOptions = {
  src: './src/stylus/',
  dest: './build/css/',
  use: autoprefixer({browsers: 'last 2 versions'}),
  stylusOptions: { compress: 'true' }
};

// Create ./build tree
console.log(chalk.yellow('[BUILD]  Creating ./build tree'));
console.log(chalk.white('------------------------------'));
mkdirp.sync('./build/html');
mkdirp.sync('./build/js');
mkdirp.sync('./build/css');
mkdirp.sync('./build/svg');

// Compile Jade
var footer = jade.renderFile('./src/jade/footer.jade', jadeOptions);
fs.writeFile('./build/html/footer.html', footer, function (err) {
  if (err) {
    throw err;
  }
  console.log(chalk.green('[HTML]   Rendered footer.html to ./build/html/'));
});
var calendar = jade.renderFile('./src/jade/calendar.jade', jadeOptions);
fs.writeFile('./build/html/calendar.html', calendar, function (err) {
  if (err) {
    throw err;
  }
  console.log(chalk.green('[HTML]   Rendered calendar.html to ./build/html/'));
});

// Compile Stylus
stylus(['rosebank.styl', 'sidebar.styl'], stylusOptions, function (err) {
  if (err) {
    throw err;
  }
  console.log(chalk.blue('[CSS]    Rendered stylus files to ./build/css/'));
});

// Minify JS
var js = UglifyJS.minify('./src/js/rosebank.js');
fs.writeFile('./build/js/rosebank.js', js.code, function (err) {
  if (err) {
    throw err;
  }
  console.log(chalk.red('[JS]     Minified js files to ./build/js/'));
});

// Copy SVG
cpr('./src/svg', './build/svg', {
  deleteFirst: false,
  overwrite: true,
  confirm: true,
  filter: /.*\.DS_Store/
}, function(err) {
  if (err) {
    throw err;
  } else {
    console.log(chalk.magenta('[SVG]    Copied svg files to ./build/svg/'));
  }
});