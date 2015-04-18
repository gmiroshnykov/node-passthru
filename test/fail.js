var passthru = require('..');

setTimeout(function() {
  process.exit(0);
}, 100);

passthru(['/bin/bash', '-c', 'exit 42'], function(err) {
  if (!err || err.code !== 42) {
    // expected an error, but got none
    process.exit(1);
  }
});
