// :: type Lens s t a b = { view: s -> a, update: s -> b -> t }
const Lens = (() => {
  // :: Lens s t a b -> s -> a
  const view = l => l.view;
  // :: Lens s t a b -> s -> b -> t
  const update = l => l.update;
  // :: Lens s t a b -> (a -> b) -> s -> t
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
