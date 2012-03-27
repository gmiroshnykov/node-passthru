var util = require('util'),
    spawn = require('child_process').spawn;

module.exports = function(command, options, callback) {
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

    if (!options.customFds) {
        options.customFds = [
            process.stdin.fd,
            process.stdout.fd,
            process.stderr.fd
        ];
    }

    // command = "ls"
    // args = ["-la", "/tmp"]
    var args = command;
    command = args.shift();

    var child = spawn(command, args, options);

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
