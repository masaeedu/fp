const { Arr } = require("..");

const Vec = n => {
  const of = Arr.replicate(n);
  const lift2 = Arr.zipWith;

  return { of, lift2 };
};

module.exports = Vec;
