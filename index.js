var tty = require('tty'),
    spawn = require('child_process').spawn,
    util = require('util');

module.exports = function(command, options, callback) {
    var defaultOptions = {
        cwd: process.cwd(),
        env: process.env
    };

    // passthru(command, callback)
    if (typeof options == 'function') {
        callback = options;
        options = {};
    }

    // passthru(command)
    if (typeof options == 'undefined') {
        options = {};
    }

    // passthru("ls -la /tmp") => passthru(["ls", "-la", "/tmp"])
    if (typeof command == 'string') {
        command = command.split(' ');
    }

    if (!options.cwd) {
        options.cwd = process.cwd();
    }

    if (!options.env) {
        options.env = process.env;
    }

    // command = "ls"
    // args = ["-la", "/tmp"]
    var args = command;
    command = args.shift();

    var child = spawn(command, args, options);
    child.stdout.pipe(process.stdout);
    child.stderr.pipe(process.stderr);
    process.stdin.pipe(child.stdin);
    tty.setRawMode(true);

    child.on('exit', function(code, signal) {
        if (!callback) {
            return;
        }

        if (code) {
            var msg = 'Process exit with code ' + code;
            if (signal) {
                msg += ' and signal ' + signal;
            }

            var error = new Error(msg);
            error.code = code;
            error.signal = signal;

            callback(error);
        }

        callback();
    });
};
