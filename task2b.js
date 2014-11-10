var ll = require('./lib/low-level');

console.log('init: %s', ll.showUsage());

var ptr = ll.malloc();
console.log('after 1 malloc: %s', ll.showUsage());

ll.free(ptr);
console.log('after free: %s', ll.showUsage());

try {
  ll.free(ptr);
} catch (e) {
  console.log('Failed to free again: %s', e);
}

try {
  while (true) {
    ll.malloc();
  }
} catch (e) {
  console.log('Infinite alloc stopped: %s', e);
}

console.log('end: %s', ll.showUsage());
