const { _ } = require("@masaeedu/infix");

const { implement } = require("../../plumbing");
const { Functor, Apply, Chain } = require("../../classes");

const Fn = require("../fn");
const Arr = require("../arr");
const Cont = require(".");

const classes = [Functor, Apply, Chain];
const derive = _(Fn)(classes)
  ["|>"](Arr.map(implement))
  ["|>"](Fn.pipe)._;

const Par_ = implement(Apply)(Cont.Par);
const Cont_ = { ...derive(Cont), Par: Par_ };

module.exports = { Cont: Cont_ };
