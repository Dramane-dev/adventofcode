# Day 6: Probably a Fire Hazard

[Link to puzzle description](https://adventofcode.com/2015/day/6)

## Puzzle Summary

You're competing in the holiday house decorating contest and decide to deploy **one million lights** in a **1000×1000 grid** to finally defeat your neighbors.

Santa has sent you instructions on how to display the ideal lighting configuration. All lights start **turned off** and are numbered from `0` to `999` in each direction (corners at `0,0`, `0,999`, `999,999`, and `999,0`).

### Instructions Format

Each instruction specifies:
- An **action**: `turn on`, `turn off`, or `toggle`
- A **rectangle**: defined by two corners like `x1,y1 through x2,y2` (inclusive)

### Part 1 Rules

- `turn on X,Y through A,B`: turn on (or leave on) all lights in that rectangle
- `turn off X,Y through A,B`: turn off (or leave off) all lights in that rectangle
- `toggle X,Y through A,B`: flip the state of all lights in that rectangle (on→off, off→on)

### Examples (Part 1)

- `turn on 0,0 through 999,999`: turns on all 1,000,000 lights
- `toggle 0,0 through 999,0`: toggles the first row of 1000 lights
- `turn off 499,499 through 500,500`: turns off the middle 4 lights (2×2 square)

---

## Your Task

- **Part 1:** After following all instructions in order, **how many lights are lit?**
- **Part 2:** You mistranslated Santa's Ancient Nordic Elvish! The lights actually have **brightness controls** (integer values starting at 0):
  - `turn on`: increase brightness by **1**
  - `turn off`: decrease brightness by **1** (minimum 0)
  - `toggle`: increase brightness by **2**
  - Question: **What is the total brightness** of all lights combined?

---

```ruby
    cd 2015/days/day-06
    npm install
    npm start
    npm run test
```

_Source code and tests in `day-06/`._

_Enjoy coding!_
