const { _ } = require("@masaeedu/infix");

const { implement } = require("../../plumbing");
const { Functor, Apply, Chain } = require("../../classes");

const Fn = require("../fn");
const Arr = require("../arr");
const Cont = require(".");

const classes = [Chain, Apply, Functor, Apply];
const derive = _(Fn)(classes)
  ["|>"](Arr.map(implement))
  ["|>"](Fn.pipe)._;

module.exports = { Cont: derive(Cont) };
