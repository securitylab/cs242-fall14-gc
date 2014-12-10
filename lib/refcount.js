var assert = require('assert');
var ll     = require('./low-level');

var HeapObject = ll.HeapObject;
var Ptr        = ll.Ptr;

Ptr.prototype.addref  = function() {
  // {{
  ++this.deref().refcount;
  // }}
};

Ptr.prototype.release = function() {
  // {{
  if (--this.deref().refcount <= 0) {
    if (this.deref().fst) {
      this.deref().fst.release();
    }
    if (this.deref().snd) {
      this.deref().snd.release();
    }
    this.free();
  }
  // }}
};

Ptr.prototype.setfst = function(x) {
  assert(ll.isPointer(x));
  // {{
  this.deref().fst = x;
  if (x) { x.addref(); }
  // }}
};

Ptr.prototype.setsnd = function(x) {
  assert(ll.isPointer(x));
  // {{
  this.deref().snd = x;
  if (x) { x.addref(); }
  // }}
};

Ptr.prototype.withfst = function(f) {
  // {{
  var fst = this.deref().fst;
  if (fst === null) {
    f(null);
  } else {
    fst.addref();
    f(fst);
    fst.release();
  }
  // }}
};

Ptr.prototype.withsnd = function(f) {
  // {{
  var snd = this.deref().snd;
  if (snd === null) {
    f(null);
  } else {
    snd.addref();
    f(snd);
    snd.release();
  }
  // }}
};

function create(fst, snd, f) {
  // {{
  var ptr = ll.malloc();
  ptr.addref();

  ptr.setfst(fst);
  ptr.setsnd(snd);

  f(ptr);
  ptr.release();
  // }}
}

// root

var root = null;

function setroot(ptr) {
  // {{
  assert(ll.isPointer(ptr));
  if (root) {
    root.release();
  }
  root = ptr;
  if (root) {
    root.addref();
  }
  // }}
}

function withroot(f) {
  // {{
  f(root);
  // }}
};
