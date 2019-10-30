const instances = require("./instances");
const { Either } = require("../src");
const { runCommand, parseCommand, helpMessage } = require("./cli");

const main = () => {
  Either.match({
    Right: runCommand(instances),
    Left: e => {
      console.error(`Error: ${e}`);
      console.log(helpMessage);
      process.exit(1);
    }
  })(parseCommand(process.argv));
};

main();
