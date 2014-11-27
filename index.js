var pipe = require('multipipe'),
    split = require('split'),
    stream = require('stream'),
    zlib = require('zlib'),
    reviews = require('./lib/reviews');

// Return a Transform stream from GZip content to review objects
module.exports = function() {
    return pipe(zlib.createGunzip(), split(), reviews());
};
