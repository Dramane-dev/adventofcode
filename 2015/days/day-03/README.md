# Day 3: Perfectly Spherical Houses in a Vacuum

[Link to puzzle description](https://adventofcode.com/2015/day/3)

## Puzzle Summary

Santa delivers presents on an infinite 2D grid of houses. He starts at coordinate `(0,0)` and delivers a present there.  
Then, for each character in the input string, he moves exactly one house in a direction:
- `^` → north (y + 1)  
- `v` → south (y - 1)  
- `>` → east  (x + 1)  
- `<` → west  (x - 1)

After each move, he delivers another present at the new location. The goal (Part 1) is to count how many unique houses receive at least one present.

### Examples

- `>` delivers to 2 houses: `(0,0)` and `(1,0)`.  
- `^>v<` delivers to 4 houses (forms a square); `(0,0)` is visited twice.  
- `^v^v^v^v^v` delivers to only 2 houses, bouncing vertically between two positions.

---

## Your Task

- Part 1: Given the instruction string, determine how many unique houses receive at least one present.  
- Part 2: Now Santa is helped by Robo-Santa. Both start at `(0,0)` and take turns following the same instruction stream (Santa handles indices 0,2,4,...; Robo-Santa 1,3,5,...). Count unique houses that receive at least one present across both.

---

## Instructions

1. Put your puzzle input in `src/input.json` (string of characters like `^v^v^v^v^v`).  
2. Run the solution:

```ruby
    cd 2015/days/day-03
    npm install
    npm start
    npm run test
```

_Source code and tests in `day-03/`._

_Enjoy coding!_