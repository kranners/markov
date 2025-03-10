export const softmax = (occurences: Record<string, number>, temperature: number = 1) => {
  const entries = Object.entries(occurences);

  const expEntries: [string, number][] = entries.map(
    ([key, occurence]) => [key, (Math.exp(occurence) / temperature)]
  );

  const expSum = expEntries.reduce((sum, [_, value]) => sum + value, 0);
  const dividedEntries = expEntries.map(([key, expOccurence]) => [key, expOccurence / expSum]);

  return Object.fromEntries(dividedEntries);
}

