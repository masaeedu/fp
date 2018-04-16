import * as Obj from "../obj";
import * as Fn from "../fn";

// ADT
// TODO: create ADT abstraction to wrap all this stuff
const S = Obj.map(Symbol)({
  direction: "@masaeedu/fp/either/direction",
  value: "@masaeedu/fp/either/value",
  left: "@masaeedu/fp/either/left",
  right: "@masaeedu/fp/either/right"
});
export const embed = d => v => ({ [S.direction]: d, [S.value]: v });
export const direction = ({ [S.direction]: d }) => d;
export const value = ({ [S.value]: v }) => v;

// Misc
export const over = d => f => x =>
  direction(x) !== d ? x : value(x) |> f |> embed(d);
export const either = l => r => x =>
  direction(x) === S.left ? l(value(x)) : r(value(x));

export const left = embed(S.left);
export const right = embed(S.right);

export const isLeft = either(Fn.const(true))(Fn.const(false));
export const isRight = either(Fn.const(false))(Fn.const(true));

// Identity
export const is = Obj.hasKey(S.direction);

// Bifunctor
export const lmap = over(S.left);
export const rmap = over(S.right);

// Functor
export const map = rmap;

// Applicative
export const of = right;
export const ap = ef => ev => map(f => map(f)(ev))(ef) |> join;

// Chain
export const join = either(left)(either(left)(right));

// Traversable
export const traverse = A => f =>
  either(x => left(x) |> A.of)(x => f(x) |> A.map(right));
