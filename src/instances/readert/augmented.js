const { _ } = require("@masaeedu/infix");

const { implement } = require("../../plumbing");
const { Chain, Apply, Functor } = require("../../classes");

const Fn = require("../fn");
const Arr = require("../arr");
const { Identity } = require("../fnctr");
const ReaderT_ = require(".");

const classes = [Functor, Apply, Chain];
const derive = _(Fn)(classes)
  ["|>"](Arr.map(implement))
  ["|>"](Fn.pipe)._;

const ReaderT = M => derive(ReaderT_(M));
const Reader = ReaderT(Identity);
module.exports = { ReaderT, Reader };
