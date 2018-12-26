const { _ } = require("@masaeedu/infix");

const { implement } = require("../../plumbing");
const { Functor, Apply, Chain } = require("../../classes");

const Fn = require(".");
const Arr = require("../arr");

const classes = [Functor, Apply, Chain];
const derive = _(Fn)(classes)
  ["|>"](Arr.map(implement))
  ["|>"](Fn.pipe)._;

module.exports = { Fn: derive(Fn) };
