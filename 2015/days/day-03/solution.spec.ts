import {
  getHousesReceivedLeastOncePresent,
  getHousesReceivedLeastOncePresentWithRobotSanta,
} from './solution';

describe('Day 3: Perfectly Spherical Houses in a Vacuum', () => {
  describe('getHousesReceivedLeastOncePresent', () => {
    const cases = [
      { level: 'easy', input: '>', expected: 2 },
      { level: 'medium', input: '^>v<', expected: 4 },
      { level: 'esay', input: '^v^v^v^v^v', expected: 2 },
      { level: 'hard', input: '>^^v^<>v<<<v<v^>>v^^^<v<>^^><^<', expected: 20 },
    ];

    it.each(cases)(
      'should return $expected when $level level with $input',
      ({ input, expected }) => {
        // GIVEN
        const instructions = input;

        // WHEN
        const result = getHousesReceivedLeastOncePresent({ instructions });

        // THEN
        expect(result.size).toBe(expected);
      },
    );
  });
  describe('getHousesReceivedLeastOncePresentWithRobotSanta', () => {
    const cases = [
      { level: 'easy', input: '^v', expected: 3 },
      { level: 'medium', input: '^>v<', expected: 3 },
      { level: 'medium', input: '^v^v', expected: 5 },
      { level: 'esay', input: '^v^v^v^v^v', expected: 11 },
      { level: 'hard', input: '>^^v^<>v<<<v<v^>>v^^^<v<>^^><^<', expected: 24 },
    ];

    it.each(cases)(
      'should return $expected when $level level with $input',
      ({ input, expected }) => {
        // GIVEN
        const instructions = input;

        // WHEN
        const result = getHousesReceivedLeastOncePresentWithRobotSanta(instructions);

        // THEN
        expect(result).toBe(expected);
      },
    );
  });
});
