# markov ⛓️

Naive & simple Markov chain implementation written in TypeScript.

## Installation

Install locally or globally with:
```shell
npm install @cute-engineer/markov

# Or, globally
npm install -g @cute-engineer/markov
```

## Usage

There are two subcommands.

1. `generate` - To generate the database. This needs to be run first.
```shell
npx markov generate /path/to/folder/of/markdown/documents
```

This will generate a file named `database.json` in your current directory.

2. `step` - This will step through the chain a given number of times, and output the result.
```shell
npx markov step <word> <count>
```

For example, to generate the next 8 words after "JavaScript":
```shell
npx markov step JavaScript 8
```

Generates an output that looks like:
```shell
docs en mozilla https for a to is
```

## Development

- Install Nix and Direnv
- `direnv allow`
- `npm install`

Off to the races 🏎️

