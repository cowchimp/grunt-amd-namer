/*
 * grunt-amd-namer
 * https://github.com/cowchimp/grunt-amd-namer
 *
 * Copyright (c) 2015 cowchimp
 * Licensed under the MIT license.
 */

'use strict';

var espree = require('espree');
var estraverse = require('estraverse');
var path = require('path');
var DEFINE = 'define';

module.exports = function (grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('amd_namer', 'Name anonymous AMD modules using AST parsing', function () {
    var opts = this.options();

    this.files.forEach(function (file) {
      var srcContents = grunt.file.read(file.src);
      var distContents = addNameToModule(srcContents, file);
      grunt.file.write(file.dest, distContents, opts);
    });
  });

};

function addNameToModule(contents, file) {
  var loc = getDefineLoc(contents);
  if(!loc) {
    return contents;
  }
  var name = getModuleName(file);

  var lines = contents.split('\n');
  lines[loc.line] = addNameToLine(lines[loc.line], loc.column, name);
  return lines.join('\n');
}

function getDefineLoc(contents) {
  var ast = espree.parse(contents, { loc: true });
  var loc = null;
  estraverse.traverse(ast, {
    enter: function (node) {
      if(isAnonymousDefineCallNode(node)) {
        loc = {
          line: node.loc.start.line - 1, //make it 0-based instead of 1-based,
          column: node.loc.start.column
        };
        this.break();
      }
    }
  });
  return loc;
}

function isAnonymousDefineCallNode(node) {
  if(node.type != 'CallExpression' || !node.callee || node.callee.name != DEFINE) {
    return false;
  }
  if(!Array.isArray(node.arguments) || !node.arguments.length) {
    return false;
  }
  var firstArg = node.arguments[0];
  return firstArg && firstArg.type != 'Literal';
}

function getModuleName(file) {
  var filename = file.dest;
  var prefix = file.orig.dest + (file.orig.dest.lastIndexOf('/') == file.orig.dest.length ? '' : '/');
  filename = stripPrefix(filename, prefix);
  filename = stripSuffix(filename, path.extname(filename));
  return filename;
}

function addNameToLine(line, column, name) {
  var ix = column + DEFINE.length + '('.length;
  var preName = line.substring(0, ix);

  var postName = line.substring(ix, line.length);

  return preName + "'" + name + "', " + postName;
}

function stripPrefix(str, prefix) {
  var ix = str.indexOf(prefix);
  return str.substr(ix + prefix.length, str.length);
}

function stripSuffix(str, suffix) {
  var ix = str.lastIndexOf(suffix);
  return str.substring(0, ix);
}
