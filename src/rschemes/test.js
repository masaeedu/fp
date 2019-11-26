const { adt, match } = require("@masaeedu/adt");
const test = require("ava");

const { Fn, Arr, Fnctr, implement, Functor, Apply, Chain } = require("..");
const { cata, ana } = require(".");

const snap = t => x => t.snapshot(x);

// List ADT
const ListF = (() => {
  const { Nil, Cons } = adt({ Nil: [], Cons: ["a", "b"] });
  const map = f => match({ Nil, Cons: x => xs => Cons(x)(f(xs)) });
  const fromArray = ana({ map })(Arr.match({ Nil, Cons }));

  return { Nil, Cons, map, fromArray };
})();
const { Nil, Cons } = ListF;

test("can fold an array", t => {
  const length = cata(ListF)(match({ Nil: 0, Cons: x => y => 1 + y }));
  const result = length(ListF.fromArray([1, 2, 3, 4]));
  snap(t)(result);
});

const monad = Fn.pipe(Arr.map(implement)([Chain, Apply, Functor, Apply]));

// :: type Lazy x = () -> x
const Lazy = (() => {
  // :: a -> Lazy a
  const of = x => () => x;
  // :: (a -> Lazy b) -> Lazy a -> Lazy b
  const chain = amb => ma => () => amb(ma())();

  return monad({ of, chain });
})();

const lazyAna = F => coalg =>
  ana(Fnctr.compose(F)(Lazy))(Fn["<:"](F.map(Lazy.of))(coalg));

test("can lazily unfold an array", t => {
  const result = lazyAna(ListF)(Arr.match(ListF))(Arr.range(1000000));
  snap(t)(result);
});
