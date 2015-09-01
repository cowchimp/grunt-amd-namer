# grunt-amd-namer

> Name anonymous AMD modules using AST parsing

## Common Usage

This task is useful if you're using an AMD loader that requires modules to have explicit names (e.g. [almond](https://github.com/jrburke/almond)).
This is especially useful if you're handling bundling yourself, as opposed to using [r.js](https://github.com/jrburke/r.js). 

## Output Example

input
`my-file.js`

```js
define(['a', 'b', 'c'], function(a, b, c) {
  console.log(a + b + c);
});
```

output
`my-file.js`

```js
define('my-file', ['a', 'b', 'c'], function(a, b, c) {
  console.log(a + b + c);
});
```

## Getting Started
This plugin requires Grunt.

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-amd-namer --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-amd-namer');
```

## The "amd_namer" Task

```js
grunt.initConfig({
  amd_namer: {
    options: {},
    files: [
      {
        expand: true,
        cwd: 'src/javascript',
        src: ['**/*.js'],
        dest: 'dist/javascript'
      }
    ],
  },
})
```

## Contributing
Feel free to open issues and send pull-requests.

## License
Copyright (c) 2015 cowchimp. Licensed under the MIT license.
