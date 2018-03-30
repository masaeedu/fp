// Misc
export const fromIter = it =>
  function*() {
    for (const x of it) {
      yield x;
    }
  };
export const toIter = gen => ({ [Symbol.iterator]: gen });

// Functor
export const map = f => g =>
  function*() {
    for (const x of toIter(g)) {
      yield f(x);
    }
  };

// Applicative
export const of = x => fromIter([x]);
export const lift2 = f => ga => gb =>
  function*() {
    for (const a of toIter(ga)) {
      for (const b of toIter(gb)) {
        yield f(a)(b);
      }
    }
  };

// Monad
export const chain = f => g =>
  function*() {
    for (const x of toIter(g)) {
      yield* toIter(f(x));
    }
  };
