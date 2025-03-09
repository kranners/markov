import { generateMarkovDatabase } from "./lib/generate";
import { loopMarkovDatabase } from "./lib/lookup";

const [subcommand, ...remainingArguments] = process.argv.slice(2);

switch (subcommand) {
  case "generate":
    // TODO: Error handling?
    const [directory] = remainingArguments;
    generateMarkovDatabase(directory);
    break;
  case "loop":
    const [queryToken, count = 1] = remainingArguments;
    const words = loopMarkovDatabase(queryToken, Number(count))
    console.log(words.join(" "));
    break;
  default:
    console.error(`Unrecognized subcommand: ${subcommand}`);
    process.exit(1);
}

