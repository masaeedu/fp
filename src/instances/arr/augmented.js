const { _ } = require("@masaeedu/infix");

const { implement } = require("../../plumbing");
const {
  Functor,
  Foldable,
  Apply,
  Chain,
  Traversable
} = require("../../classes");

const Arr_ = require(".");

const Arr = _({ implement })(Arr_)
  .implement(Functor)
  .implement(Apply)
  .implement(Chain)
  .implement(Foldable)
  .implement(Traversable)._;

module.exports = { Arr };
