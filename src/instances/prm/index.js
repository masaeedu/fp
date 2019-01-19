const { typeid } = require("../../plumbing/typeid");

const Prm = (() => {
  // Identity
  const is = x => typeid(x) === "Promise";

  // Promises aren't actually proper functors/monads, these instances are a lie

  // Monad
  const of = x => Promise.resolve(x);
  const chain = f => p => p.then(f);

  return { is, of, chain };
})();

module.exports = Prm;
