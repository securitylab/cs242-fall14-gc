var assert = require('assert');
var ll     = require('./low-level');

var HeapObject = ll.HeapObject;
var Ptr        = ll.Ptr;

Ptr.prototype.setfst = function(x) {
  assert(ll.isPointer(x));
  this.deref().fst = x;
};

Ptr.prototype.setsnd = function(x) {
  assert(ll.isPointer(x));
  this.deref().snd = x;
};

Ptr.prototype.withfst = function(f) {
  // {{
  withStack(this.deref().fst, f);
  // }}
};

Ptr.prototype.withsnd = function(f) {
  // {{
  withStack(this.deref().snd, f);
  // }}
};

function create(fst, snd, f) {
  // {{
  var ptr = ll.malloc();

  ptr.setfst(fst);
  ptr.setsnd(snd);

  // XXX do we need withStack for fst & snd?
  withStack(ptr, f);
  // }}
}

function withStack(ptr, f) {
  // {{
  if (ptr) {
    root.stack.push(ptr);
    f(ptr);
    root.stack.pop();
  } else {
    f(null);
  }
  // }}
}

// root

var root = { root: null, stack: [] };

function setroot(ptr) {
  assert(ll.isPointer(ptr));
  root.root = ptr;
}

function withroot(f) {
  // {{
  withStack(root.root, f);
  // }}
};


// GC

function mark() {
  // {{
  function _mark(ptr) {
    if (ptr && !ptr.deref().traced) {
      ptr.deref().traced = true;
      _mark(ptr.deref().fst);
      _mark(ptr.deref().snd);
    }
  }

  _mark(root.root);
  root.stack.forEach(function (ptr) { _mark(ptr); });
  // }}
}

function sweep() {
  // {{
  ll.heapIterate(function (ptr) {
    if (!ptr.deref().traced && !ptr.deref()._free) {
      ptr.free();
    }
    ptr.deref().traced = false;
  });
  // }}
}

function gc() {
  mark();
  sweep();
}
