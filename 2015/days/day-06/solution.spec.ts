import { findHowManyLightsAreLit } from './solution';

describe('Day 6: Probably a Fire Hazard', () => {
  describe('findHowManyLightsAreLit', () => {
    const cases = [
      // TURN ON CASES
      {
        level: 'basic - single light',
        input: ['turn on 0,0 through 0,0'],
        expected: 1,
      },
      {
        level: 'basic - small square',
        input: ['turn on 0,0 through 2,2'],
        expected: 9,
      },
      {
        level: 'basic - rectangle',
        input: ['turn on 887,9 through 959,629'],
        expected: 45333,
      },

      // TURN OFF CASES
      {
        level: 'turn off - cancel everything',
        input: ['turn on 0,0 through 2,2', 'turn off 0,0 through 2,2'],
        expected: 0,
      },
      {
        level: 'turn off - partial overlap',
        input: ['turn on 0,0 through 2,2', 'turn off 1,1 through 2,2'],
        expected: 5, // 9 - 4 (the 2x2 square turned off)
      },
      {
        level: 'turn off - on already off lights',
        input: ['turn off 0,0 through 999,999'],
        expected: 0, // All lights start off
      },

      // TOGGLE CASES
      {
        level: 'toggle - simple',
        input: ['toggle 0,0 through 2,2'],
        expected: 9, // All 9 lights toggle from off to on
      },
      {
        level: 'toggle - double toggle',
        input: ['toggle 0,0 through 2,2', 'toggle 0,0 through 2,2'],
        expected: 0, // Toggle twice = back to off
      },
      {
        level: 'toggle - partial',
        input: ['turn on 0,0 through 2,2', 'toggle 1,1 through 2,2'],
        expected: 5, // 9 on, 4 toggle to off = 5 remaining
      },

      // COMPLEX SEQUENCES
      {
        level: 'complex - multiple operations',
        input: [
          'turn on 0,0 through 2,2', // 9 on
          'turn on 1,1 through 3,3', // +5 new (total 14)
          'turn off 2,2 through 2,2', // -1 (total 13)
        ],
        expected: 13,
      },
      {
        level: 'complex - overlapping rectangles',
        input: [
          'turn on 0,0 through 4,4', // 25 on
          'turn off 2,0 through 4,4', // turn off 15 (right side)
          'toggle 0,2 through 4,4', // toggle bottom: 5 off->on, 10 on (left)->off
        ],
        expected: 13, // 10 from left top + 0 from toggles
      },

      // EDGE CASES
      {
        level: 'edge - full grid on',
        input: ['turn on 0,0 through 999,999'],
        expected: 1000000,
      },
      {
        level: 'edge - single row',
        input: ['turn on 0,0 through 999,0'],
        expected: 1000,
      },
      {
        level: 'edge - single column',
        input: ['turn on 0,0 through 0,999'],
        expected: 1000,
      },
      {
        level: 'edge - example from puzzle',
        input: [
          'turn on 0,0 through 999,999',
          'toggle 0,0 through 999,0',
          'turn off 499,499 through 500,500',
        ],
        expected: 1000000 - 1000 - 4, // All on, first row toggled off, 2x2 middle off
      },
    ];

    it.each(cases)(
      'should return $expected when $level level with $input',
      ({ input, expected }) => {
        // GIVEN
        // WHEN
        const result = findHowManyLightsAreLit(input);

        // THEN
        expect(result).toBe(expected);
      },
    );
  });
});
