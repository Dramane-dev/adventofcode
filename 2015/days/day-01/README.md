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
