const instances = require("./instances");
const { Either } = require("../src");
const { runCommand, parseCommand } = require("./cli");

const main = () => {
  Either.match({
    Right: runCommand(instances),
    Left: e => {
      console.log(`Error: ${e}`);
      console.log(helpMessage);
      process.exit(1);
    }
  })(parseCommand(process.argv));
};

main();
