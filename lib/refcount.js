var assert = require('assert');
var ll     = require('./low-level');

var HeapObject = ll.HeapObject;
var Ptr        = ll.Ptr;

Ptr.prototype.addref  = function() {
  // Task 3(a){{
  // }}
};

Ptr.prototype.release = function() {
  // Task 3(a){{
  // }}
};

Ptr.prototype.setfst = function(x) {
  assert(ll.isPointer(x));
  // Task 3(b){{
  // }}
};

Ptr.prototype.setsnd = function(x) {
  assert(ll.isPointer(x));
  // Task 3(b){{
  // }}
};

Ptr.prototype.withfst = function(f) {
  // Task 3(b){{
  // }}
};

Ptr.prototype.withsnd = function(f) {
  // Task 3(b){{
  // }}
};

function create(fst, snd, f) {
  // Task 3(b){{
  // }}
}
exports.create = create;

// Roots

var root = null;

function setroot(ptr) {
  // Task 3(b){{
  // }}
}
exports.setroot = setroot;

function withroot(f) {
  // Task 3(b){{
  // }}
}
exports.withroot = withroot;
