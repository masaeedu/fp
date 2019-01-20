const Applicanoid = A => M => {
  const empty = A.of(M.empty);
  const append = A.lift2(M.append);

  return { empty, append };
};

module.exports = { Applicanoid };
