var assert = require('assert');
var util   = require('util');
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
  // Task 4(a) {{
  // }}
};

Ptr.prototype.withsnd = function(f) {
  // Task 4(a) {{
  // }}
};

function create(fst, snd, f) {
  // Task 4(a) {{
  // }}
}
exports.create = create;

// Roots

var root = { root: null, stack: [] };

function setroot(ptr) {
  assert(ll.isPointer(ptr));
  root.root = ptr;
}
exports.setroot = setroot;

function withroot(f) {
  // Task 4(a) {{
  // }}
};
exports.withroot = withroot;

exports.showRoots = function () {
  var a = root.stack.map(function(e) { return e.toString() });
  return util.format('[%s%s%s]', root.root ? root.root : ''
                             , (root.root && a.length > 0) ? ',' : ''
                             , a);
}

// GC

function mark() {
  // Task 4(b) {{
  // }}
}
exports.mark = mark;

function sweep() {
  ll.heapIterate(function (ptr) {
  // Task 4(b) {{
  // }}
  });
}
exports.sweep = sweep;

function gc() {
  mark();
  sweep();
}
exports.gc = gc;

/* Task 4(c):






*/
