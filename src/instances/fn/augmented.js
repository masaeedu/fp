const { _ } = require("@masaeedu/infix");

const { implement } = require("../../plumbing");
const { Functor, Apply, Chain, Category } = require("../../classes");

const Fn = require(".");
const Arr = require("../arr");

const classes = [Functor, Apply, Chain, Category];
const derive = _(Fn)(classes)
  ["|>"](Arr.map(implement))
  ["|>"](Fn.pipe)._;

module.exports = { Fn: derive(Fn) };
