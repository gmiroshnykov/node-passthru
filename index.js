var spawn = require('child_process').spawn;

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

    // use current process' stdin, stdout and stderr by default
    if (typeof options.customFds == 'undefined') {
        options.customFds = [
            process.stdin,
            process.stdout,
            process.stderr
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
