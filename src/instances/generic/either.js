export default ({ Left, Right, match }) => {
  // Monad
  const of = Right;
  const chain = f => match({ Left, Right: f });

  // Traversable
  const traverse = A => f =>
    match({ Left: x => A.of(Left(x)), Right: x => A.map(Right)(f(x)) });

  // Bifunctor
  const bimap = l => r =>
    match({ Left: x => l(x) |> Left, Right: x => r(x) |> Right });

  return { of, chain, traverse, bimap };
};
