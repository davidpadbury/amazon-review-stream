var stream = require('stream'),
    util = require('util');

function ReviewStream() {
    stream.Transform.call(this, {
        objectMode: true
    });

    this.review = null;
    this.count = 0;
}

util.inherits(ReviewStream, stream.Transform);

ReviewStream.prototype._transform = function(line, encoding, callback) {
    var split = line.indexOf(':');

    if (split >= 0) {
        // we have a value
        var key = line.slice(0, split),
            value = line.slice(split + 1),
            properties = key.split('/'),
            // create an empty review if we're starting a new record
            obj = this.review || (this.review = {}),
            property = properties.shift();

        // create nested objects
        while (properties.length > 0) {
            obj = obj[property] || (obj[property] = {});
            property = properties.shift();
        }

        // set the actual value
        obj[property] = value;
    } else {
        // Check we've added content
        if (this.review) {
            // produce review
            this.push(this.review);
            this.review = null;
            this.count++;
        }
    }

    // and we're done
    callback();
};

// Create a new review stream
module.exports = function() {
    return new ReviewStream();
};
