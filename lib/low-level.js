var assert = require('assert');
var util   = require('util');

// Heap objects

function HeapObject(fst, snd, next) {
  if (!this instanceof HeapObject) {
    return new HeapObject(fst, snd);
  }

  assert(isPointer(fst));
  assert(isPointer(snd));
  assert(isPointer(next));

  this.fst      = fst;
  this.snd      = snd;

  this._free    = true;
  this._next    = next;

  this.refcount = 0;
  this.traced   = false;
}
exports.HeapObject = HeapObject;

function isHeapObject(obj) {
  return (obj instanceof HeapObject);
}

// Heap itself

var heap = new Array(1000);

(function () {
  for (var i = 0; i < heap.length - 1; i++) {
    heap[i] = new HeapObject(null, null, new Ptr(i + 1));
  }
  heap[heap.length - 1] = new HeapObject(null, null, null);
})();

exports.heapIterate = function(f) {
  for (var i = 0; i < heap.length - 1; i++) {
    f(new Ptr(i));
  }
};

var free_list_head = new Ptr(0);
var free_list_tail = new Ptr(heap.length - 1);

// Low level pointers

function Ptr(idx) {
  if (!this instanceof Ptr) {
    return new Ptr(idx);
  }
  assert(idx < heap.length);
  this._idx = idx;
}
exports.Ptr = Ptr;

Ptr.prototype.equals = function(other) {
  if (other instanceof Ptr) {
    return (this._idx === other._idx);
  }
  return false;
};

Ptr.prototype.deref = function() {
  return heap[this._idx];
};

Ptr.prototype.write = function(v) {
  if (!isHeapObject(v)) {
    throw new Error('Can only write HeapObject to the heap');
  }
  heap[this._idx] = v;
};

function isPointer(p) {
  return (p instanceof Ptr) || p === null;
}
exports.isPointer = isPointer;

function malloc() {
  // {{
  // malloc should throw an exception if we ran out of memory
  // The implementation may keep one cell around.
  if (free_list_head.equals(free_list_tail)) {
    throw new Error('Out of memory');
  }
  var ptr = free_list_head;
  free_list_head = ptr.deref()._next;
  ptr.deref()._free = false;
  // }}
  return ptr;
}
exports.malloc = malloc;

function free(ptr) {
  assert(isPointer(ptr));
  if (ptr === null) {
    throw new Error('Cannot free a null pointer');
  }
  // {{
  if (ptr.deref()._free) {
    throw new Error('Double free');
  }
  ptr.deref()._free = true;
  free_list_tail.deref()._next = ptr;
  free_list_tail               = ptr;
  free_list_tail.deref()._next = null;
  // }}
}
exports.free = free;

Ptr.prototype.free = function() {
  free(this);
};

// Diagnostics

function usage() {
  var total = heap.length - 1;
  var free  = 0;
  var ptr = free_list_head;
  while (!ptr.equals(free_list_tail)) {
    free++;
    ptr = ptr.deref()._next;
  }
  return '[ free: ' + free +
         ', used: ' + (total - free) +
         ', total: ' + total + ' ]';
}
exports.usage = usage;

exports.showHeap = function(type) {
  var res = [];
  for (var i = 0; i < heap.length; i++) {
    var obj = heap[i];
    var fst = obj.fst ? obj.fst._idx : null;
    var snd = obj.snd ? obj.snd._idx : null;
    if (!obj._free) {
      switch (type) {
        case 'ref':
          res.push(util.format('{%d @ [%d] : (%s, %s)}', i, obj.refcount,
                                                          fst, snd));
          break;
        case 'trace':
          res.push(util.format('{%d @ [%s] : (%s, %s)}', i, obj.traced ? '*' : '-',
                                                            fst, snd));
          break;
        default:
          res.push(util.format('{%d @ [%d|%s] : (%s, %s)}', i, obj.refcount,
                                                             obj.traced ? '*' : '-',
                                                             fst, snd));
          break;
      };
    }
  }
  return '[ ' + res.toString() + ' ]';
};

/*
var ptr = malloc();
console.log(ptr);
console.log(usage());
malloc(); console.log(usage());
free(ptr); console.log(usage());
console.log(usage());
*/
