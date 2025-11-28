# Day 2: I Was Told There Would Be No Math

[Link to puzzle description](https://adventofcode.com/2015/day/2)

## Puzzle Summary

The elves are running low on wrapping paper and need to order exactly what’s required. Each present is a perfect rectangular box with dimensions `l x w x h` (in feet).

To compute the required wrapping paper per present:
- Surface area: `2*l*w + 2*w*h + 2*h*l`
- Extra (slack): the area of the smallest side

Total paper for one present = surface area + smallest-side area.

### Examples

- For `2x3x4`:  
  - Sides: `lw=6`, `wh=12`, `hl=8`  
  - Surface: `2*6 + 2*12 + 2*8 = 52`  
  - Slack: `min(6, 12, 8) = 6`  
  - Total: `58`

- For `1x1x10`:  
  - Sides: `lw=1`, `wh=10`, `hl=10`  
  - Surface: `2*1 + 2*10 + 2*10 = 42`  
  - Slack: `min(1, 10, 10) = 1`  
  - Total: `43`

---

## Your Task

Given a list of dimensions (one per line, formatted as `LxWxH`), compute the total number of square feet of wrapping paper needed across all presents.

## Part 2

The elves are also running low on **ribbon**. Ribbon is all the same width, so they only need to worry about the **length** they need to order.

### Ribbon Calculation

For each present, the ribbon required consists of two parts:

1. **Wrap ribbon**: The shortest distance around the present's sides (smallest perimeter)
   - Formula: `2 × (smallest side + second smallest side)`

2. **Bow ribbon**: The cubic feet of volume
   - Formula: `length × width × height`

**Total ribbon per present** = wrap ribbon + bow ribbon

### Examples

For a present with dimensions `2x3x4`:
- Smallest two dimensions: `2` and `3`
- Wrap ribbon: `2 × (2 + 3) = 10` feet
- Bow ribbon: `2 × 3 × 4 = 24` feet
- **Total ribbon needed**: `10 + 24 = 34` feet

For a present with dimensions `1x1x10`:
- Smallest two dimensions: `1` and `1`
- Wrap ribbon: `2 × (1 + 1) = 4` feet
- Bow ribbon: `1 × 1 × 10 = 10` feet
- **Total ribbon needed**: `4 + 10 = 14` feet

### Your Task

Given the same list of present dimensions, calculate the **total feet of ribbon** the elves should order for all presents.

---

## Instructions

1. Put your puzzle input in `src/input.json` (as a string with line breaks, or an array of strings).
2. Run the solution:

```ruby
    cd 2015/days/day-02
    npm install
    npm start
    npm run test
```

_Source code and tests in `day-02/`._

_Enjoy coding!_
