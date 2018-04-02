import { Fn } from ".";

// Misc
export const fromGen = gen => ({ [Symbol.iterator]: gen });
export const toArr = it => [...it];

// Identity
export const is = ({ [Symbol.iterator]: itgen = undefined }) =>
  itgen !== undefined &&
  Fn.is(
    itgen
  ) /* TODO: maybe check whether itgen produces an iterator with a next property, but getting into diminishing returns at that point */;

// Functor
export const map = f => it =>
  fromGen(function*() {
    for (const x of it) {
      yield f(x);
    }
  });

// Applicative
export const of = x =>
  fromGen(function*() {
    yield x;
  });
export const lift2 = f => ita => itb =>
  fromGen(function*() {
    for (const a of ita) {
      for (const b of itb) {
        yield f(a)(b);
      }
    }
  });

// Monad
export const chain = f => it =>
  fromGen(function*() {
    for (const x of it) {
      yield* f(x);
    }
  });

// Monoid
export const empty = fromGen(function*() {});
export const append = ita => itb =>
  fromGen(function*() {
    for (const x of ita) {
      yield x;
    }
    for (const x of itb) {
      yield x;
    }
  });

// Foldable
export const fold = f => z => it => {
  let result = z;
  for (const x of it) {
    result = f(result)(x);
  }
  return result;
};
