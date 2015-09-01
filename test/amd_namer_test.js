'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.amd_namer = {
  setUp: function (done) {
    // setup here if necessary
    done();
  },
  simple: function (test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/simple.js');
    var expected = grunt.file.read('test/expected/simple.js');
    test.equal(actual, expected, '`simple` module is named.');

    test.done();
  },
  nested_level_define: function (test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/nested-level-define.js');
    var expected = grunt.file.read('test/expected/nested-level-define.js');
    test.equal(actual, expected, '`nested-level-define` module is named.');

    test.done();
  },
  module_in_sub_directory: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/directory/module-in-sub-directory.js');
    var expected = grunt.file.read('test/expected/directory/module-in-sub-directory.js');
    test.equal(actual, expected, '`module-in-sub-directory` module is named.');

    test.done();
  },
  already_named: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/already-named.js');
    var expected = grunt.file.read('test/expected/already-named.js');
    test.equal(actual, expected, '`existing-different-name` module is already named.');

    test.done();
  }
};
