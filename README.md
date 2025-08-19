# Advent of Code 2015 – TypeScript Solutions

<p align="center">
  <img 
        alt="GO" 
        width="100" 
        height="100"
        src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg"
        style="margin-left: auto; margin-right: auto"
    />
</p>

This repository contains my solutions for the 2015 edition of [Advent of Code](https://adventofcode.com/2015), an annual programming event!  
Each day presents a puzzle (usually in two parts), perfect for improving algorithmic skills and TypeScript knowledge.

## Goal

- **One puzzle per day**
- Algorithm-focused, clean and testable code
- Pedagogical approach (explanations, attempts, alternatives)

## Project Structure

```ruby
adventofcode/
└── 2015/
    └── days/
        ├── day-01/
        │   ├── index.ts
        │   └── input.ts
        │   └── package-lock.json
        │   └── package.json
        │   └── README.md
        │   ├── solution.ts
        │   ├── solution.spec.ts
        │   └── tsconfig.json
        ├── day-02/
        │   └── ...
```

**Each day folder contains:**

- `index.ts` – file that read input, import solution and run it
- `input.ts` – official puzzle input
- `solution.ts` – solution for the puzzle
- `solution.spec.ts` – unit tests
- `package.json` – dependencies and scripts specific to that day

## Before run

Move inside the folder of the day you want to work on.

## Installation

```ruby
    npm install
```

## Running the solutions

```ruby
    npm start
```

## Running the tests

```ruby
    npm test
```

## Philosophy

- Each day includes notes and thoughts on algorithms, complexity, alternatives, and useful links inside the solution files.
- Folder and file names match puzzle titles to ease navigation.

## Official Link

[Advent of Code 2015](https://adventofcode.com/2015)

---

**Happy coding and enjoy the puzzles!**

**Dramane-dev 👋🏽**
