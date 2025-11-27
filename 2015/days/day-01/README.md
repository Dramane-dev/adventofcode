# Day 1: Not Quite Lisp

[Link to puzzle description](https://adventofcode.com/2015/day/1)

## Puzzle Summary

Santa hoped for a white Christmas, but his snow machine needs stars to run! To collect them, you help Santa solve puzzles.

In this first puzzle, Santa is delivering presents in a huge apartment building but can't find the right floor. He starts on floor **0**. Each character in the input string is an instruction:

- **(** means go up one floor.
- **)** means go down one floor.

There is no top or bottom limit to the building; Santa can go as high or as deep as needed.

**Examples:**

| Inputs    | Results |
| --------- | ------- |
| `(())`    | 0       |
| `()()`    | 0       |
| `(((`     | 3       |
| `(()(()(` | 3       |
| `))(((((` | 3       |
| `())`     | -1      |
| `))(`     | -1      |
| `)))`     | -3      |
| `)())())` | -3      |

**Your Task:**  
Given an input string (the puzzle input), determine what floor the instructions take Santa to.

## Part 2

Now Santa's elves are concerned about the basement (floor `-1`). They want to know the **position** of the first instruction that causes Santa to enter the basement for the first time [web:82][web:84].

### Important Notes
- Instructions are **1-indexed**: the first character is at position `1`, not `0` [web:79][web:82]
- You need to find the **first time** Santa reaches floor `-1` [web:82][web:84]

### Examples

For the input `)`
- Santa immediately enters the basement at position `1` [web:84]

For the input `()())`
- Position 1: `(` → floor 0 → 1
- Position 2: `)` → floor 1 → 0
- Position 3: `(` → floor 0 → 1
- Position 4: `)` → floor 1 → 0
- Position 5: `)` → floor 0 → **-1** ✓
- Answer: position `5` [web:79][web:82]

### Your Task

Given the same input string, find the **position number** (1-indexed) of the character that first causes Santa to enter the basement (floor `-1`)

## Instructions

1. Place your puzzle input in `day-01/input.json` (as a string).
2. Run the solution:

```ruby
    cd 2015/days/day-01
    npm install
    npm start
    npm run test
```

_Source code and tests in `day-01/`._

_Enjoy coding!_
