var ll = require('./lib/low-level');
var ms = require('./lib/marksweep');

ms.create(null, null, function (ptr1) {
  console.log('a: create ptr1: %s', ll.showHeap('trace'));
  ms.create(null, null, function (ptr1_fst) {
    console.log('b: create fst: %s', ll.showHeap('trace'));
    ptr1.setfst(ptr1_fst);
    console.log('b: ptr1.setfst(fst): %s', ll.showHeap('trace'));
    ms.gc();
  });
  console.log('a: %s', ll.showHeap('trace'));
});
ms.gc();
console.log('end: %s', ll.showHeap('trace'));
