var ll = require('./lib/low-level');
var ms = require('./lib/marksweep');

ms.create(null, null, function (ptr) {
  console.log('create ptr && setroot: %s', ll.showHeap('trace'));
  ms.setroot(ptr);
});
ms.gc();
console.log('end: %s', ll.showHeap('trace'));
