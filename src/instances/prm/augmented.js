const { _ } = require("@masaeedu/infix");

const { implement } = require("../../plumbing");
const { Chain, Apply, Functor } = require("../../classes");

const Fn = require("../fn");
const Arr = require("../arr");
const Prm = require(".");

const classes = [Chain, Apply, Functor, Apply];
const derive = _(Fn)(classes)
  ["|>"](Arr.map(implement))
  ["|>"](Fn.pipe)._;

module.exports = { Prm: derive(Prm) };
