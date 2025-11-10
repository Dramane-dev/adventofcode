import { findHowManyNiceStrings } from './solution';

describe("Day 5: Doesn't He Have Intern-Elves For This?", () => {
  describe('findHowManyNiceStrings', () => {
    const cases = [
      { level: 'easy', input: ['abcdef', 'ugknbfddgicrmopn'], expected: 1 },
      {
        level: 'medium',
        input: ['pqrstuvv', 'aabgvyzdsv', 'aaacbgvyzdsv', 'aacdgvyzdsv', 'aaa'],
        expected: 2,
      },
      {
        level: 'hard',
        input: [
          'abcdefpqrstuvbgvyzdsv',
          'abcdefugknbfddgicrmopn',
          'jchzalrnumimnmhp',
          'haegwjzuvuyypxyu',
          'dvszwmarrgswjxmb',
        ],
        expected: 0,
      },
    ];

    it.each(cases)(
      'should return $expected when $level level with $input',
      ({ input, expected }) => {
        // GIVEN
        // WHEN
        const result = findHowManyNiceStrings(input);

        // THEN
        expect(result).toBe(expected);
      },
    );
  });
});
