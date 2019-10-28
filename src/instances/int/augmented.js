const { implement } = require("../../plumbing");
const ClassDef = require("../classdef");
const { Num } = require("../../classes");

const Arr = require("../arr");

const Int = require(".");
const IntSum = require("./sum");
const IntProduct = require("./product");

const classes = Arr.fold(ClassDef)([Num]);

module.exports = { Int: implement(classes)(Int), IntSum, IntProduct };
