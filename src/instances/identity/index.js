const Identity = (() => {
  const map = f => a => f(a);
  const chain = map;
  const ap = map;
  const lift2 = f => a => b => f(a)(b);
  const of = a => a;
  return {
    map,
    chain,
    ap,
    lift2,
    of
  };
})();

module.exports = Identity;
