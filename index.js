var spawn = require('child_process').spawn;

// TODO: this stuff is experimental
//var children = [];
//process.on('SIGINT', killChildren('SIGINT'));
//process.on('SIGTERM', killChildren('SIGTERM'));

//function killChildren(signal) {
//    return function() {
//        children.forEach(function(child) {
//            console.log('Killing child with ', signal);
//            child.kill(signal);
//        });
//    };
//}

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

    // use current process' stdin, stdout and stderr
    // FIXME: this approach is unreliable for some reason
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
    children.push(child);

    child.on('exit', function(code, signal) {
        var i = children.indexOf(child);
        children.splice(i, 1);

        if (callback) {
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
        }
    });

    // child.stdout.on('data', function (data) {
    //     process.stdout.write(data);
    // });
    //
    // child.stderr.on('data', function (data) {
    //     process.stderr.write(data);
    // });
    //
    // process.stdin.on('data', function(data) {
    //     child.stdin.write(data);
    // });
};

