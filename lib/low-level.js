var assert = require('assert');
var util   = require('util');

// The heap (not yet initialized properly)
var heap = new Array(1000);

// Heap objects

function HeapObject(next) {
  if (!this instanceof HeapObject) {
    return new HeapObject(next);
  }

  assert(isPointer(next));

  // Pointers to other objects
  this.fst      = null;
  this.snd      = null;

  this._free    = true; // Is this object free?
  this._next    = next; // Next object on free list

  this._refcount = 0;
  this._traced   = false;
}
exports.HeapObject = HeapObject;

function isHeapObject(obj) {
  return (obj instanceof HeapObject);
}

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
  // Task 1 {{
  // }}
};

Ptr.prototype.write = function(v) {
  if (!isHeapObject(v)) {
    throw new Error('Can only write HeapObject to the heap');
  }
  // Task 1 {{
  // }}
};

Ptr.prototype.toString = function() {
  return this._idx.toString();
};

function isPointer(p) {
  return (p instanceof Ptr) || p === null;
}
exports.isPointer = isPointer;


// Initialize the heap


function initHeap() {
  // Task 2(a) {{
  // }}
}

var free_list_head = new Ptr(0);
var free_list_tail = new Ptr(heap.length - 1);

initHeap();

// Exposed function for iterating over whole heap:
exports.heapIterate = function(f) {
  for (var i = 0; i < heap.length - 1; i++) {
    f(new Ptr(i));
  }
};

// Memory allocation

function malloc() {
  // Task 2(b) {{
  // }}
}
exports.malloc = malloc;

function free(ptr) {
  assert(isPointer(ptr));
  if (ptr === null) {
    throw new Error('Cannot free a null pointer');
  }
  // Task 2(b) {{
  // }}
}
exports.free = free;

// An easier way of freeing the object pointed to by this pointer:
Ptr.prototype.free = function() { free(this); };

// Diagnostics

function showUsage() {
  var total = heap.length;
  var free  = 0;
  var ptr   = free_list_head;
  while (!(ptr === null)) {
    free++;
    ptr = ptr.deref()._next;
  }
  return '[ free: ' + free +
         ', used: ' + (total - free) +
         ', total: ' + total + ' ]';
}
exports.showUsage = showUsage;

exports.showHeap = function(type) {
  var res = [];
  for (var i = 0; i < heap.length; i++) {
    var obj = heap[i];
    var fst = obj.fst ? obj.fst._idx : null;
    var snd = obj.snd ? obj.snd._idx : null;
    if (!obj._free) {
      switch (type) {
        case 'ref':
          res.push(util.format('{%d @ [%d] : (%s, %s)}', i,
                               obj._refcount, fst, snd));
          break;
        case 'trace':
          res.push(util.format('{%d @ [%s] : (%s, %s)}', i,
                               obj._traced ? '*' : '-', fst, snd));
          break;
        default:
          res.push(util.format('{%d @ [%d|%s] : (%s, %s)}', i,
                                obj._refcount,
                                obj._traced ? '*' : '-', fst, snd));
          break;
      };
    }
  }
  return '[ ' + res.toString() + ' ]';
};
