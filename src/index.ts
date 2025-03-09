import { generateMarkovDatabase } from "./lib/generate";
import { lookupMarkovDatabase } from "./lib/lookup";

const [subcommand, remainingArguments] = process.argv.slice(2);

switch (subcommand) {
  case "generate":
    // TODO: Error handling?
    generateMarkovDatabase(remainingArguments);
    break;
  case "lookup":
    console.log(lookupMarkovDatabase(remainingArguments));
    break;
  default:
    console.error(`Unrecognized subcommand: ${subcommand}`);
    process.exit(1);
}

