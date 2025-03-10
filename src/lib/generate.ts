import { readdirSync, readFileSync, writeFileSync } from "fs"
import { DATABASE_JSON_FILEPATH } from "..";

type MarkovDatabase = Record<string, Record<string, number>>;

export const generateMarkovDatabase = (directory: string) => {
  // Recurse through the directory, get all files
  const files = readdirSync(directory, { recursive: true });
  const documents = files.filter((filename) => filename.toString().endsWith(".md"));

  // For each file, tokenize and turn into a giant flat list of tokens
  const tokens = documents.flatMap((document) => {
    const contents = readFileSync(`${directory}/${document}`).toString();

    // Remove the empty whitespace tokens
    return contents.split(/\W+/).filter(token => token !== '');
  });

  // For each pair of tokens, increment an occurence of token a -> token b
  // Skip the first token, as we need to iterate pairwise
  const database = tokens.slice(1).reduce<MarkovDatabase>((accumulator, token, tokenIndex) => {
    const previousToken = tokens[tokenIndex - 1];

    if (accumulator[token] === undefined) {
      accumulator[token] = {};
    }

    const occurences = accumulator[token]?.[previousToken] ?? 0;

    if (typeof occurences !== "number") {
      console.debug("Skipping non-number occurence", { token, previousToken });
      return accumulator;
    }

    accumulator[token][previousToken] = occurences + 1;

    return accumulator;
  }, {});

  // Serialize the JSON and save it to a file
  writeFileSync(DATABASE_JSON_FILEPATH, JSON.stringify(database, null, 2));
}
