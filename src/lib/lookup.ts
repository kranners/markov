import { readFileSync } from "fs"

const softmax = (occurences: Record<string, number>) => {
  const entries = Object.entries(occurences);

  const expEntries: [string, number][] = entries.map(
    ([key, occurence]) => [key, (Math.exp(occurence))]
  );

  const expSum = expEntries.reduce((sum, [_, value]) => sum + value, 0);
  const dividedEntries = expEntries.map(([key, expOccurence]) => [key, expOccurence / expSum]);

  return Object.fromEntries(dividedEntries);
}

const lookupRespectingProbabilities = (probabilities: Record<string, number>) => {
  const random = Math.random();
  let cumulativeChance = 0;

  for (const [token, probability] of Object.entries(probabilities)) {
    cumulativeChance += probability;
    if (random < cumulativeChance) {
      return token;
    }
  }
}

export const lookupMarkovDatabase = (queryToken: string, databasePath: string = "database.json") => {
  const database = JSON.parse(readFileSync(databasePath).toString());

  const occurences = database?.[queryToken];
  const probabilities = softmax(occurences);

  return lookupRespectingProbabilities(probabilities);
}

