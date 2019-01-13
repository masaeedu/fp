const { _ } = require("@masaeedu/infix");

const { implement } = require("../../plumbing");
const { Functor, Apply, Foldable, Traversable } = require("../../classes");

const Fn = require("../fn");
const Arr = require("../arr");
const Obj = require(".");

const classes = [Functor, Apply, Foldable, Traversable];
const derive = _(Fn)(classes)
  ["|>"](Arr.map(implement))
  ["|>"](Fn.pipe)._;

module.exports = { Obj: derive(Obj) };
