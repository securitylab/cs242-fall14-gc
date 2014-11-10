var ll = require('./lib/low-level');
var ms = require('./lib/marksweep');

console.log('start: %s', ms.showRoots());
ms.create(null, null, function (ptr1_fst) {
  console.log('create fst: %s', ms.showRoots());
  ms.create(ptr1_fst, null, function (ptr1) {
    console.log('before setroot(ptr): %s', ms.showRoots());
    ms.setroot(ptr1);
    console.log('setroot(ptr): %s', ms.showRoots());
    ptr1.withfst(function() {
      console.log('ptr1.withfst: %s', ms.showRoots());
    });
    console.log('</setroot...>: %s', ms.showRoots());
  });
  console.log('</create...>: %s', ms.showRoots());
});
console.log('end: %s', ms.showRoots());
