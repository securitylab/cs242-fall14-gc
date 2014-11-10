var ll = require('./lib/low-level');
var rc = require('./lib/refcount');

rc.create(null, null, function (ptr1_fst) {
  console.log('a: create fst : %s', ll.showHeap('ref'));
  rc.create(ptr1_fst, null, function (ptr1) {
    console.log('b: create ptr: %s', ll.showHeap('ref'));
  });
  console.log('a: %s', ll.showHeap('ref'));
});
console.log('end: %s', ll.showHeap('ref'));
