const Arr = require("../arr");

const Fn = (() => {
  const _ = {};

  // Identifiable
  const is = x => typeof x === "function";

  // Category
  const id = x => x;
  const compose = f => g => a => f(g(a));

  // Misc
  _["const"] = x => _ => x;
  const flip = f => x => y => f(y)(x);
  const pipe = fs => x => fs.reduce((p, f) => f(p), x);
  const passthru = flip(pipe);
  const uncurry = Arr.foldl(id);
  const curryN = n => f => {
    const loop = a => acc => (a === 0 ? f(acc) : x => loop(a - 1)([...acc, x]));
    return loop(n)([]);
  };
  const feed = x => f => f(x);
  _["$"] = _["|>"] = id;

  // Functor
  const map = compose;

  // Chain
  const of = _["const"];
  const chain = f => fn => x => f(fn(x))(x);

  // prettier-ignore
  return {
    ..._,
    // Identifiable
    is,
    // Category
    id, compose,
    // Misc
    flip, pipe, passthru, uncurry, curryN, feed,
    // Functor
    map,
    // Chain
    of, chain
  };
})();

module.exports = Fn;
