const Fn = require("../fn");

const Cont = (() => {
  // Misc
  const run = cont => cont(Fn.id);
  const delay = d => v => cb => setTimeout(() => cb(v), d);

  // Monad
  const of = x => cb => cb(x);
  const chain = f => ma => cb => ma(a => f(a)(cb));

  // prettier-ignore
  return {
    // Misc
    run, delay,
    // Monad
    of, chain
  };
})();

module.exports = Cont;
