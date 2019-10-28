const { _ } = require("@masaeedu/infix");

const { implement } = require("../../plumbing");
const { Chain, Apply, Functor } = require("../../classes");

const Fn = require("../fn");
const Arr = require("../arr");
const { Identity } = require("../fnctr");
const StateT_ = require(".");

const classes = [Functor, Apply, Chain];
const derive = _(Fn)(classes)
  ["|>"](Arr.map(implement))
  ["|>"](Fn.pipe)._;

const StateT = M => derive(StateT_(M));
const State = StateT(Identity);
module.exports = { StateT, State };
