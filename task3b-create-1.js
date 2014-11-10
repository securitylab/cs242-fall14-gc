var ll = require('./lib/low-level');
var rc = require('./lib/refcount');

rc.create(null, null, function (ptr1) {
  console.log('a: create ptr1: %s', ll.showHeap('ref'));
  rc.create(null, null, function (ptr1_fst) {
    console.log('b: create fst: %s', ll.showHeap('ref'));
    ptr1.setfst(ptr1_fst);
    console.log('b: ptr1.setfst(fst): %s', ll.showHeap('ref'));
  });
  console.log('a: %s', ll.showHeap('ref'));
});
console.log('end: %s', ll.showHeap('ref'));
