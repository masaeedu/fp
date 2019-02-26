const { _ } = require("@masaeedu/infix");

const { implement } = require("../../plumbing");
const { Category } = require("../../classes");

const Fn = require("../fn");
const Arr = require("../arr");
const Kleisli = require(".");

const classes = [Category];
const derive = _(Fn)(classes)
  ["|>"](Arr.map(implement))
  ["|>"](Fn.pipe)._;

module.exports = { Kleisli: derive(Kleisli) };
