# Day 5: Doesn't He Have Intern-Elves For This?

[Link to puzzle description](https://adventofcode.com/2015/day/5)

## Puzzle Summary

Santa needs help determining which strings in his text file are **naughty** or **nice** [attached_file:1].

A **nice string** must satisfy ALL three conditions:
1. Contains at least **3 vowels** (`a`, `e`, `i`, `o`, `u` only) [attached_file:1]
2. Contains at least **one letter appearing twice in a row** (like `xx`, `aa`, `dd`) [attached_file:1]
3. Does **NOT** contain any of these forbidden substrings: `ab`, `cd`, `pq`, `xy` [attached_file:1]

### Examples

| String              | Nice? | Why? |
|---------------------|-------|------|
| `ugknbfddgicrmopn`  | ✓ Yes | 3+ vowels (`u`,`i`,`o`), double letter (`dd`), no forbidden strings |
| `aaa`               | ✓ Yes | 3+ vowels (`a`,`a`,`a`), double letter (`aa`), no forbidden strings |
| `jchzalrnumimnmhp`  | ✗ No  | No double letter |
| `haegwjzuvuyypxyu`  | ✗ No  | Contains forbidden `xy` |
| `dvszwmarrgswjxmb`  | ✗ No  | Only 1 vowel

---

## Your Task

- **Part 1:** Given a list of strings (one per line), count how many are **nice** according to the rules above [attached_file:1].
- **Part 2:** Santa realized he had the wrong ruleset. New rules will be revealed after Part 1 is completed.

---

## Instructions

1. Put your puzzle input in `src/input.json` (array of strings or newline-separated text).
2. Run the solution:

```ruby
    cd 2015/days/day-05
    npm install
    npm start
    npm run test
```

_Source code and tests in `day-05/`._

_Enjoy coding!_
