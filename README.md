node-passthru
=============

Spawns a child process attached to parent's stdin, stdout and stderr.
Inspired by PHP's passthru().

[![Build Status](https://secure.travis-ci.org/laggyluke/node-passthru.png)](http://travis-ci.org/laggyluke/node-passthru)

Usage
-----

    passthru(command, [options], [callback]);

For example, do an `ls -la` in the current directory:

    var passthru = require('passthru');
    passthru('ls -la', function(err) {
        // ...
    });

You can also pass command as an array of strings.
This is mandatory for arguments containing spaces and other special characters.

    passthru(['ls', '-la'], function(err) {
        // ...
    });

You can use any options supported by `child_process.spawn`:

    passthru('ls -la', {cwd: '/tmp'}, function(err) {
        // ...
    });
