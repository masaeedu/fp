const { _ } = require("@masaeedu/infix");

const { implement } = require("../../plumbing");
const { Functor, Apply } = require("../../classes");

const Fn = require("../fn");
const Arr = require("../arr");
const Vec = require(".");

const classes = [Functor, Apply];
const derive = _(Fn)(classes)
  ["|>"](Arr.map(implement))
  ["|>"](Fn.pipe)._;

module.exports = { Vec: n => derive(Vec(n)) };
