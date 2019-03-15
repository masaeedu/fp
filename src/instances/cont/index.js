const Fn = require("../fn");

const Cont = (() => {
  // Misc
  const run = cont => cont(Fn.id);
  const delay = d => v => cb => setTimeout(() => cb(v), d);

  // Monad
  const of = x => cb => cb(x);
  const chain = f => ma => cb => ma(a => f(a)(cb));

  // Parallel applicative
  const Par = (() => {
    const lift2 = f => c1 => c2 => cb => {
      let state = 0;
      let v_ = undefined;
      c1(v => (state === 2 ? cb(f(v)(v_)) : ((state = 1), (v_ = v))));
      c2(v => (state === 1 ? cb(f(v_)(v)) : ((state = 2), (v_ = v))));
    };

    return { of, lift2 };
  })();

  // prettier-ignore
  return {
    // Misc
    run, delay,
    // Monad
    of, chain,
    // Parallel applicative
    Par
  };
})();

module.exports = Cont;
