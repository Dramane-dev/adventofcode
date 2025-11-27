# Day 8: Matchsticks

[Link to puzzle description](https://adventofcode.com/2015/day/8)

## Puzzle Summary

Santa is bringing his list as a digital copy this year and needs to calculate the storage space required. The challenge: understanding the difference between **characters in the code representation** and **characters in memory** for strings with escape sequences.

### The Problem

You receive a file containing multiple string literals (one per line), each enclosed in double quotes. These strings use classic escape sequences:

- `\\` represents a single backslash
- `\"` represents a lone double-quote character
- `\x` + 2 hexadecimal characters represents a single ASCII character

### Detailed Examples

| Code in file | Code characters | Memory characters | Explanation                              |
|--------------|-----------------|-------------------|------------------------------------------|
| `""`         | 2               | 0                 | Just the quotes, empty string            |
| `"abc"`      | 5               | 3                 | The 3 letters + 2 quotes                 |
| `"aaa\"aaa"` | 10              | 7                 | 6 'a' letters + 1 escaped quote          |
| `"\x27"`     | 6               | 1                 | Single character (apostrophe `'`) in hex |

In these examples:
- **Total code**: `2 + 5 + 10 + 6 = 23` characters
- **Total memory**: `0 + 3 + 7 + 1 = 11` characters  
- **Difference**: `23 - 11 = 12`

---

## Your Task

- **Part 1:** For the entire input file, calculate the **total difference** between the number of code characters and the number of in-memory characters.
  
  Question: **What is that number?**

- **Part 2:** *(Will be revealed after completing Part 1)*

---


```ruby
    cd 2015/days/day-08
    npm install
    npm start
    npm run test
```

_Source code and tests in `day-08/`._

_Enjoy coding!_
