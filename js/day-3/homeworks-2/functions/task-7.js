'use strict'

function once(fn) {
    let fnCalled = true;
    let fnLog;

    return (name) => {
        if(fnCalled) {
            fnCalled = false;
            fnLog = fn(name);
            console.log(`function is running ${ fnLog }`)
        } else {
            console.log(fnLog);
        }
    }
}

const fn = (name) => { return name };

const cache = once(fn);

cache('beka');
cache('test');
cache('test1');
