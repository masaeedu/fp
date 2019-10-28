const { _ } = require("@masaeedu/infix");

const { implement } = require("../../plumbing");
const { Chain, Apply, Functor } = require("../../classes");

const Fn = require("../fn");
const Arr = require("../arr");
const Prm = require(".");

const classes = [Functor, Apply, Chain];
const derive = _(Fn)(classes)
  ["|>"](Arr.map(implement))
  ["|>"](Fn.pipe)._;

module.exports = { Prm: derive(Prm) };
