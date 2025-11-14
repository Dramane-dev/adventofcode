import { findHowManyLightsAreLit, findTotalBrightness } from './solution';

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
  describe('findTotalBrightness', () => {
    const cases = [
      // === TURN ON CASES ===
      {
        level: 'basic - single turn on',
        input: ['turn on 0,0 through 0,0'],
        expected: 1, // brightness = 1
      },
      {
        level: 'basic - small square turn on',
        input: ['turn on 0,0 through 2,2'],
        expected: 9, // 9 lights × 1 brightness each
      },
      {
        level: 'basic - multiple turn on same light',
        input: ['turn on 0,0 through 0,0', 'turn on 0,0 through 0,0'],
        expected: 2, // brightness stacks: 1 + 1 = 2
      },

      // === TURN OFF CASES ===
      {
        level: 'turn off - on already off light',
        input: ['turn off 0,0 through 0,0'],
        expected: 0, // brightness stays at 0 (minimum)
      },
      {
        level: 'turn off - decrease brightness',
        input: ['turn on 0,0 through 0,0', 'turn on 0,0 through 0,0', 'turn off 0,0 through 0,0'],
        expected: 1, // 0 + 1 + 1 - 1 = 1
      },
      {
        level: 'turn off - cannot go below 0',
        input: ['turn on 0,0 through 0,0', 'turn off 0,0 through 0,0', 'turn off 0,0 through 0,0'],
        expected: 0, // 1 - 1 - 0 = 0 (second turn off does nothing)
      },

      // === TOGGLE CASES ===
      {
        level: 'toggle - increases by 2',
        input: ['toggle 0,0 through 0,0'],
        expected: 2, // brightness = 2
      },
      {
        level: 'toggle - multiple times',
        input: ['toggle 0,0 through 0,0', 'toggle 0,0 through 0,0'],
        expected: 4, // 2 + 2 = 4
      },
      {
        level: 'toggle - small square',
        input: ['toggle 0,0 through 2,2'],
        expected: 18, // 9 lights × 2 brightness each
      },

      // === COMPLEX SEQUENCES ===
      {
        level: 'complex - turn on then toggle',
        input: ['turn on 0,0 through 0,0', 'toggle 0,0 through 0,0'],
        expected: 3, // 1 + 2 = 3
      },
      {
        level: 'complex - all operations on same light',
        input: [
          'turn on 0,0 through 0,0', // +1 = 1
          'turn on 0,0 through 0,0', // +1 = 2
          'toggle 0,0 through 0,0', // +2 = 4
          'turn off 0,0 through 0,0', // -1 = 3
        ],
        expected: 3,
      },
      {
        level: 'complex - overlapping rectangles',
        input: [
          'turn on 0,0 through 1,1', // 4 lights with brightness 1 = 4
          'toggle 0,0 through 1,1', // same 4 lights +2 = 12 total (4×3)
        ],
        expected: 12,
      },
      {
        level: 'complex - partial overlap',
        input: [
          'turn on 0,0 through 2,2', // 9 lights × 1 = 9
          'toggle 1,1 through 2,2', // 4 lights +2 = 9 + 8 = 17
        ],
        expected: 17, // 5 lights with brightness 1 + 4 lights with brightness 3
      },

      // === EXAMPLE FROM PUZZLE ===
      {
        level: 'puzzle example 1',
        input: ['turn on 0,0 through 0,0'],
        expected: 1,
      },
      {
        level: 'puzzle example 2',
        input: ['toggle 0,0 through 999,999'],
        expected: 2000000, // 1,000,000 lights × 2 brightness
      },

      // === EDGE CASES ===
      {
        level: 'edge - full grid turn on',
        input: ['turn on 0,0 through 999,999'],
        expected: 1000000, // 1M lights × 1 brightness
      },
      {
        level: 'edge - full grid toggle',
        input: ['toggle 0,0 through 999,999'],
        expected: 2000000, // 1M lights × 2 brightness
      },
      {
        level: 'edge - rectangle operations',
        input: [
          'turn on 0,0 through 2,2', // 9 × 1 = 9
          'turn on 1,1 through 3,3', // 5 new lights × 1 + 4 overlap × 1 = 9 + 9 = 18
          'toggle 2,2 through 2,2', // 1 light +2 = 18 + 2 = 20
        ],
        expected: 20,
      },
    ];

    it.each(cases)(
      'should return $expected when $level level with $input',
      ({ input, expected }) => {
        // GIVEN
        // WHEN
        const result = findTotalBrightness(input);

        // THEN
        expect(result).toBe(expected);
      },
    );
  });
});
