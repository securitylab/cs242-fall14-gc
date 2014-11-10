var ll = require('./lib/low-level');
var ms = require('./lib/marksweep');

ms.create(null, null, function (ptr1) {
  ms.setroot(ptr1);
  ms.create(null, null, function (ptr1_fst) {
    ptr1.setfst(ptr1_fst);
  });
});

ms.create(null, null, function (ptr2) {
  ms.create(null, null, function (ptr2_snd) {
    ptr2.setsnd(ptr2_snd);
  });
});
ms.mark();
console.log('%s', ll.showHeap('trace'));
