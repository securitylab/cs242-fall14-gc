var ll = require('./lib/low-level');
var rc = require('./lib/refcount');

// create a new object
var ptr1 = ll.malloc();
ptr1.addref();

// set the object's fst field to a newly allocated pointer
ptr1.deref().fst = ll.malloc();
ptr1.deref().fst.addref();

console.log(ll.showUsage());
console.log('1 addref: %s', ll.showHeap('ref'));

var ptr2 = ptr1;

ptr2.addref();
console.log('2 addref: %s', ll.showHeap('ref'));

ptr1.release();
console.log(ll.showHeap('ref'));
console.log('1 release: %s', ll.showHeap('ref'));

ptr2.release();
console.log('2 release: %s', ll.showHeap('ref'));
console.log(ll.showUsage());
