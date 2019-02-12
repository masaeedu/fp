// :: type Lens a b s t = { view: s -> a, update: s -> b -> t }
const Lens = (() => {
  // :: Lens a b s t -> s -> a
  const view = l => l.view;
  // :: Lens a b s t -> s -> b -> t
  const update = l => l.update;
  // :: Lens a b s t -> (a -> b) -> s -> t
  const modify = l => f => s => l.update(s)(f(l.view(s)));

  // :: k -> Lens v v' { [k]: v } { [k]: v' }
  const prop = k => {
    const view = ({ [k]: v }) => v;
    const update = s => v_ => ({ ...s, [k]: v_ });

    return { view, update };
  };

  return { view, update, modify, prop };
})();

module.exports = Lens;
