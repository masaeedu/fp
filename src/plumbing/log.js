export const logMsg = msg => value => {
  const { stack } = new Error();
  const caller = stack.split("\n").slice(2);

  console.log(msg !== undefined ? { value, caller, msg } : { value, caller });
  return value;
};

export const log = logMsg(undefined);
