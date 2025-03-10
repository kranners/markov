import { readFileSync } from "fs"
import { softmax } from "./softmax";
import { DATABASE_JSON_FILEPATH } from "..";

const lookupRespectingProbabilities = (probabilities: Record<string, number>) => {
  const random = Math.random();
  let cumulativeChance = 0;

  for (const [token, probability] of Object.entries(probabilities)) {
    cumulativeChance += probability;
    if (random < cumulativeChance) {
      return token;
    }
  }

  throw new Error("Lookup failed, probabilities didn't sum to 1.");
}

export const lookupMarkovDatabase = (queryToken: string, temperature: number) => {
  const database = JSON.parse(readFileSync(DATABASE_JSON_FILEPATH).toString());

  const occurences = database?.[queryToken];
  const probabilities = softmax(occurences, temperature);

  return lookupRespectingProbabilities(probabilities);
}

export const stepMarkovDatabase = (queryToken: string, count: number, temperature: number) => {
  const words: string[] = [];

  while (count > 0) {
    const word = words.at(-1) ?? queryToken;
    words.push(lookupMarkovDatabase(word, temperature));
    count--;
  }

  return words;
}

