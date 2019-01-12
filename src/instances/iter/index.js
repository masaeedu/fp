const { _ } = require("@masaeedu/infix");

const { Fn } = require("../fn");

const Iter = (() => {
  const Fn = require("../fn");

  // Identity
  // TODO: maybe check whether itgen produces an iterator with a next property, but getting into diminishing returns at that point
  const is = ({ [Symbol.iterator]: itgen = undefined }) =>
    itgen !== undefined && Fn.is(itgen);

  // Conversions
  const fromGen = gen => ({ [Symbol.iterator]: gen });
  const toArr = it => [...it];
  const toIterator = it => it[Symbol.iterator]();
  const fromIterator = itr =>
    fromGen(function*() {
      while (true) {
        const { done, value } = itr.next();
        if (done) break;
        yield value;
      }
    });

  // Constructors
  const nil = fromGen(function*() {});
  const cons = x => it =>
    fromGen(function*() {
      yield x;
      yield* it;
    });

  // Accessors
  const head = it => it[Symbol.iterator]().next().value;
  const idx = i => it =>
    _(Fn)(it)
      ["|>"](drop(i))
      ["|>"](head)._;

  // Slicing
  const drop = n => it => {
    const itr = toIterator(it);
    while (n-- > 0) {
      const { done } = itr.next();
      if (done) return empty;
    }
    return fromIterator(itr);
  };
  const take = n => it =>
    fromGen(function*() {
      for (const x of it) {
        if (n-- <= 0) return;
        yield x;
      }
    });

  // "Zippy" applicative
  const repeat = x =>
    fromGen(function*() {
      while (true) {
        yield x;
      }
    });
  const zipWith = f => a => b =>
    fromGen(function*() {
      const itr1 = a[Symbol.iterator]();
      const itr2 = b[Symbol.iterator]();
      while (true) {
        const { done: d1, value: v1 } = itr1.next();
        const { done: d2, value: v2 } = itr2.next();

        if (d1 || d2) break;
        yield f(v1)(v2);
      }
    });

  // Monad
  const of = x =>
    fromGen(function*() {
      yield x;
    });
  const chain = f => it =>
    fromGen(function*() {
      for (const x of it) {
        yield* f(x);
      }
    });

  // Monoid
  const empty = nil;
  const append = ita => itb =>
    fromGen(function*() {
      yield* ita;
      yield* itb;
    });

  // Foldable
  const foldl = f => z => it => {
    let result = z;
    for (const x of it) {
      result = f(result)(x);
    }
    return result;
  };

  // Traversable
  const sequence = A => {
    const redex = A.lift2(b => a => append(b)(of(a)));
    const zero = A.of(empty);

    return foldl(redex)(zero);
  };

  // Misc
  const transpose = sequence({ of: repeat, lift2: zipWith });

  return {
    // Misc
    transpose,
    // Idenity
    is,
    // Conversions
    fromGen,
    toArr,
    toIterator,
    fromIterator,
    // Constructors
    nil,
    cons,
    // Accessors
    head,
    idx,
    // Slicing
    drop,
    take,
    // Zippy applicative
    repeat,
    zipWith,
    // Monad
    of,
    chain,
    // Monoid
    empty,
    append,
    // Foldable
    foldl,
    // Traversable
    sequence
  };
})();

module.exports = Iter;
