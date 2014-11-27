# Amazon Review Stream

Node Transform Stream for parsing the [SNAP Amazon Review datasets](http://snap.stanford.edu/data/web-Amazon-links.html) into JavaScript objects.

## Usage

Assuming you've saved a SNAP dataset locally.

```javascript
var fs = require('fs'),
    reviews = require('amazon-review-stream');

var reviewStream = fs.createReadStream('./Arts.txt.gz').pipe(reviews());

reviewStream.on('data', function(item) {
    console.log('Product: %s', item.product.title);
    console.log('Review: %s', item.review.summary);
});
```

Of course if you're a very patient person, you could just stream directly from the SNAP site. Keep in mind this below sample will pull down 4.4GB of data if you sit through it...

```javascript
var request = require('request'),
    reviews = require('amazon-review-stream');

var reviewStream = request('http://snap.stanford.edu/data/amazon/Books.txt.gz').pipe(reviews());

reviewStream.on('data', function(item) {
    console.log('Review: %s', item.review.summary);
});
```
