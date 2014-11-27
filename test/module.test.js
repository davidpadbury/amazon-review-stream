var fs = require('fs'),
    assert = require('assert'),
    reviewStream = require('../');

describe('review-stream', function() {

    describe('with real sample', function() {
        var reviews = [];

        beforeEach(function(done) {
            var stream = fs.createReadStream(__dirname + '/examples/Arts.excerpt.txt.gz').pipe(reviewStream());

            stream.on('data', function(review) {
                reviews.push(review);
            });

            stream.on('end', done);
        });

        it('should have given us a bunch of reviews', function() {
            assert.equal(reviews.length, 3);
        });
    });

});
