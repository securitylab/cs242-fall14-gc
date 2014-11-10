var ll = require('./lib/low-level');
var ms = require('./lib/marksweep');

ms.create(null, null, function (ptr1_fst) {
  console.log('a: create fst : %s', ll.showHeap('trace'));
  ms.create(ptr1_fst, null, function (ptr1) {
    console.log('b: create ptr: %s', ll.showHeap('trace'));
    ptr1_fst.setfst(ptr1);
    console.log('b: fst.setfst(ptr): %s', ll.showHeap('trace'));
  });
  ms.gc();
  console.log('a: %s', ll.showHeap('trace'));
});
ms.gc();
console.log('end: %s', ll.showHeap('trace'));
