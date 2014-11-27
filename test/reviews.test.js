var fs = require('fs'),
    assert = require('assert'),
    split = require('split'),
    reviews = require('../lib/reviews');

function readReviews(filename, callback) {
    var results = [];

    var input = fs.createReadStream(__dirname + '/examples/' + filename, {
        encoding: 'utf8'
    });

    var reviewStream = input.pipe(split()).pipe(reviews());

    reviewStream.on('data', function(review) {
        results.push(review);
    });

    reviewStream.on('end', function() {
        callback(null, results);
    });
}

describe('reviews', function() {

    describe('with single review', function() {
        var results = [];

        beforeEach(function(done) {
            readReviews('single-review.txt', function(err, result) {
                results = result;
                done();
            });
        });

        it('should have produced a single review', function() {
            assert.equal(results.length, 1);
        });

        it('should have set properties', function() {
            assert.equal('hi', results[0].valueone);
            assert.equal('world', results[0].valuetwo);
        });
    });

    describe('with two reviews', function() {
        var results = [];

        beforeEach(function(done) {
            readReviews('two-reviews.txt', function(err, result) {
                results = result;
                done();
            });
        });

        it('should have produced two reviews', function() {
            assert.equal(results.length, 2);
        });
    });

    describe('with deep properties', function() {
        var review = [];

        beforeEach(function(done) {
            readReviews('deep-property-mapping.txt', function(err, result) {
                review = result[0];
                done();
            });
        });

        it('should have objects as top level values', function() {
            assert.equal(typeof review.parent, 'object');
            assert.equal(typeof review.anotherparent, 'object');
        });

        it('should have set values', function() {
            assert.equal(review.parent.child, 'childvalue');
            assert.equal(review.parent.anotherchild, 'anotherchildvalue');
            assert.equal(review.anotherparent.anotherchild, 'anothervalue');
        });
    });

});
