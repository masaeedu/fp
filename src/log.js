let n = 0;
export const log = value => {
  const { stack } = new Error();
  const caller = stack.split("\n").slice(2);

  console.log({ value, caller });
  return value;
};
