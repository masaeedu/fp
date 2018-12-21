const { implement } = require("../../plumbing");
const {
  Functor,
  Foldable,
  Apply,
  Chain,
  Traversable
} = require("../../classes");

const Fn = require("../fn");
const Arr = require(".");

const classes = [Functor, Apply, Chain, Foldable, Traversable];
const derive = Fn.pipe(Arr.map(implement)(classes));

module.exports = { Arr: derive(Arr) };
