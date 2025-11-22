# Day 7: Some Assembly Required

[Link to puzzle description](https://adventofcode.com/2015/day/7)

## Puzzle Summary

This year, Santa brought little Bobby Tables a set of **wires and bitwise logic gates**! Unfortunately, little Bobby is a bit under the recommended age range, and he needs help assembling the circuit.

Each wire has an **identifier** (lowercase letters) and can carry a **16-bit signal** (a number from `0` to `65535`). A signal is provided to each wire by a gate, another wire, or some specific value. Each wire can only get a signal from one source, but can provide its signal to multiple destinations. **A gate provides no signal until all of its inputs have a signal**.

### Instruction Types

The included instructions booklet describes how to connect the parts together:

- `123 -> x`: the signal `123` is provided to wire `x`
- `x AND y -> z`: the bitwise AND of wire `x` and wire `y` is provided to wire `z`
- `p LSHIFT 2 -> q`: the value from wire `p` is left-shifted by `2` and then provided to wire `q`
- `NOT e -> f`: the bitwise complement of the value from wire `e` is provided to wire `f`
- `x OR y -> z`: bitwise OR gate
- `y RSHIFT 2 -> g`: right-shift operation

### Example Circuit

123 -> x
456 -> y
x AND y -> d
x OR y -> e
x LSHIFT 2 -> f
y RSHIFT 2 -> g
NOT x -> h
NOT y -> i

text

After it is run, these are the signals on the wires:
d: 72
e: 507
f: 492
g: 114
h: 65412
i: 65079
x: 123
y: 456

text

---

## Your Task

**Part 1:** In little Bobby's kit's instructions booklet (provided as your puzzle input), **what signal is ultimately provided to wire `a`?**

**Part 2:** *(unlocked after completing Part 1)*

---

## Technical Notes

- Signals are **16-bit unsigned integers** (0-65535)
- Standard bitwise operations are available in most programming languages
- Watch out for **dependencies**: some wires depend on other wires that don't have a value yet
- Instruction execution order is **not necessarily sequential**

---

```ruby
    cd 2015/days/day-07
    npm install
    npm start
    npm run test
```

_Source code and tests in `day-07/`._

_Enjoy coding!_
