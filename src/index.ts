#!/usr/bin/env node
import { generateMarkovDatabase } from "./lib/generate";
import { stepMarkovDatabase } from "./lib/lookup";

const [subcommand, ...remainingArguments] = process.argv.slice(2);

switch (subcommand) {
  case "generate":
    const [directory] = remainingArguments;
    generateMarkovDatabase(directory);
    break;
  case "step":
    const [queryToken, count = 1] = remainingArguments;
    const words = stepMarkovDatabase(queryToken, Number(count))
    console.log(words.join(" "));
    break;
  default:
    console.error(`Unrecognized subcommand: ${subcommand}`);
    process.exit(1);
}

