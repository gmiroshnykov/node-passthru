var abort = setTimeout(function() {
    console.error('Timeout reached, aborting.');
    process.exit(1);
}, 1000);

var passthru = require('..');
passthru('bash -c "echo this has a space in it"', function(err) {
    if (err) throw err;
    clearTimeout(abort);
});
