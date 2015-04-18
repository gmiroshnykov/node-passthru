#!/usr/bin/env bash
EXPECTED="Hello World!"
# we're piping it two times to test both stdin and stdout
ACTUAL=`echo "$EXPECTED" | node test/cat.js | node test/cat.js`
RETVAL=$?

if [ $RETVAL -ne 0 ]; then
    echo -e "FAILED 1: Expecting exit code 0, but got $RETVAL."
    exit 1
fi

if [ "$EXPECTED" != "$ACTUAL" ]; then
    echo -e "FAILED 1: Expecting string '$EXPECTED', but got '$ACTUAL'."
    exit 1
fi

node test/fail.js
RETVAL=$?
if [ $RETVAL -ne 0 ]; then
    echo -e "FAILED 2: Expecting exit code 0, but got $RETVAL."
    exit 1
fi

echo 'PASSED'
exit 0
