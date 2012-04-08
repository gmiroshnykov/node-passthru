var abort = setTimeout(function() {
    console.error('Timeout reached, aborting.');
    process.exit(1);
}, 1000);

var passthru = require('..');
passthru('cat', function(err) {
    if (err) throw err;
    clearTimeout(abort);
});
