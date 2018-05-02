export default ({ Cons, Nil, match }) => {
  // Misc
  const length = match({ Nil: 0, Cons: _ => tail => 1 + length(tail) });
  // Functor
  const map = match({ Nil, Cons: head => tail => Cons(f(head))(map(f)(tail)) });

  return { length, map };
};
