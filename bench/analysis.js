require("@babel/register");
const { Arr, Obj, Maybe } = require("../src");

const { Just, Nothing } = Maybe;

const summary = result => {
  const d = Arr.map(s => {
    const runs = mapMaybe(pickM(["name", "hz"]))(Obj.values(s));
    const name = Obj.get("name")(s);
    return { runs, name };
  })(result.suites);
  return Arr.foldMap(Obj)(({ name, runs }) => ({
    [name]: Arr.foldMap(Obj)(({ name, hz }) => ({ [name]: Math.round(hz) }))(
      runs
    )
  }))(d);
};

const compare = r1 => r2 => {
  const compareRuns = t1 => t2 => ({
    first: t1,
    second: t2,
    change: String((t2 / t1 - 1) * 100) + "%"
  });
  const compareSuites = Obj.zipWith(compareRuns);
  return Obj.zipWith(compareSuites)(summary(r1))(summary(r2));
};

const pickM = props => o =>
  Obj.traverse(Maybe)(k => safeGet(k)(o))(Obj.mirror(props));

const safeGet = k => o => (o.hasOwnProperty(k) ? Just(o[k]) : Nothing);

const mapMaybe = f => {
  const go = x => acc =>
    Maybe.match({
      Just: v => Arr.Cons(v)(acc),
      Nothing: acc
    })(f(x));
  return Arr.foldr(go)([]);
};

module.exports = { summary, compare };
