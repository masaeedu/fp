export default ({ Left, Right, match }) => {
  const map = f => match({ Left, Right: x => Right(f(x)) });
  const of = Right;
  const chain = f => match({ Left, Right: f });

  return { map, of, chain };
};
