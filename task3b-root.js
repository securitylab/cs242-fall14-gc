var ll = require('./lib/low-level');
var rc = require('./lib/refcount');

rc.create(null, null, function (ptr) {
  console.log('create ptr && setroot: %s', ll.showHeap('ref'));
  rc.setroot(ptr);
});
console.log('end: %s', ll.showHeap('ref'));
