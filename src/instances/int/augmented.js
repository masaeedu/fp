const { _ } = require("@masaeedu/infix");

const { implement } = require("../../plumbing");
const { Num } = require("../../classes");

const Fn = require("../fn");
const Arr = require("../arr");

const Int = require(".");
const IntSum = require("./sum");
const IntProduct = require("./product");

const classes = [Num];
const derive = _(Fn)(classes)
  ["|>"](Arr.map(implement))
  ["|>"](Fn.pipe)._;

module.exports = { Int: derive(Int), IntSum, IntProduct };
