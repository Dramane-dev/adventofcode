# Day 4: The Ideal Stocking Stuffer

[Link to puzzle description](https://adventofcode.com/2015/day/4)

## Puzzle Summary

Santa needs to mine AdventCoins (similar to Bitcoin) as gifts. Mining requires finding MD5 hashes that, in hexadecimal, start with at least **five zeroes**.

The process:
- Input: a secret key (your puzzle input) + a positive number (1, 2, 3, ...)
- Compute the MD5 hash of this combined string
- Check if the hash starts with `00000` in hexadecimal
- Find the **lowest number** that produces such a hash

### Examples

- Secret key `abcdef`:
  - Answer: `609043`
  - MD5(`abcdef609043`) = `000001dbbfa...` ✓ starts with 5 zeros

- Secret key `pqrstuv`:
  - Answer: `1048970`
  - MD5(`pqrstuv1048970`) = `000006136ef...` ✓ starts with 5 zeros

---

## Your Task

- **Part 1:** Find the lowest positive number that, when appended to your secret key, produces an MD5 hash starting with five zeros [attached_file:1][web:39].
- **Part 2:** Now find one starting with **six zeros** [web:41].

---

## Instructions

1. Put your secret key in `src/input.json` (simple string like `"iwrupvqb"`).
2. Run the solution:


```ruby
    cd 2015/days/day-04
    npm install
    npm start
    npm run test
```

_Source code and tests in `day-04/`._

_Enjoy coding!_
