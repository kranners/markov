#!/usr/bin/env node
import { generateMarkovDatabase } from "./lib/generate";
import { stepMarkovDatabase } from "./lib/lookup";

export const DATABASE_JSON_FILEPATH = "database.json";

const [subcommand, ...remainingArguments] = process.argv.slice(2);

switch (subcommand) {
  case "generate":
    const [directory] = remainingArguments;
    generateMarkovDatabase(directory);
    break;
  case "step":
    const [queryToken, count = 1, temperature = 1] = remainingArguments;
    const words = stepMarkovDatabase(queryToken, Number(count), Number(temperature))
    console.log(words.join(" "));
    break;
  default:
    console.error(`Unrecognized subcommand: ${subcommand}`);
    process.exit(1);
}

