import { assertIsValidInputSize, cleanInput, parseInputToNumber, sortInput } from '.';

describe('cleanInput', () => {
  const cases = [
    { level: 'easy', input: '', expected: [NaN] },
    { level: 'easy', input: '2x3x4', expected: [2, 3, 4] },
    { level: 'easy', input: '1x1x10', expected: [1, 1, 10] },
    { level: 'easy', input: '23x20x22', expected: [23, 20, 22] },
    { level: 'hard', input: '6789x456x967894', expected: [6789, 456, 967894] },
  ];

  it.each(cases)(
    'should return $expected when $level level whith $input',
    ({ input, expected }) => {
      // GIVEN
      const caseInput = input;

      // WHEN
      const result = cleanInput(caseInput);

      // THEN
      expect(result).toEqual(expected);
    },
  );
});

describe('assertIsValidInputSize', () => {
  const cases = [
    { level: 'easy', input: '2x3x4', expected: undefined },
    { level: 'easy', input: '1x1x10', expected: undefined },
    { level: 'easy', input: '23x20x22', expected: undefined },
    { level: 'hard', input: '6789x456x967894', expected: undefined },
  ];

  it.each(cases)(
    'should return $expected when $level level whith $input',
    ({ input, expected }) => {
      // GIVEN
      const caseInput = input;

      // WHEN
      const result = assertIsValidInputSize(caseInput);

      // THEN
      expect(result).toBe(expected);
    },
  );

  it('should throw an input size error', () => {
    // GIVEN
    const input = '2x3';

    // WHEN & THEN
    expect(() => assertIsValidInputSize(input)).toThrow(
      Error('Incorrect input size, the minimum required is 5 but received: 3'),
    );
  });
});

describe('parseInputToNumber', () => {
  const cases = [
    { level: 'easy', input: '', expected: NaN },
    { level: 'easy', input: '2', expected: 2 },
    { level: 'easy', input: '585', expected: 585 },
    { level: 'easy', input: '1567', expected: 1_567 },
    { level: 'hard', input: '967894', expected: 967894 },
  ];

  it.each(cases)(
    'should return $expected when $level level whith $input',
    ({ input, expected }) => {
      // GIVEN
      const caseInput = input;

      // WHEN
      const result = parseInputToNumber(caseInput);

      // THEN
      expect(result).toEqual(expected);
    },
  );
});

describe('sortInput', () => {
  const cases = [
    { level: 'easy', input: [], expected: [] },
    { level: 'easy', input: [4, 3, 2], expected: [2, 3, 4] },
    { level: 'easy', input: [1, 1, 10], expected: [1, 1, 10] },
    {
      level: 'medium',
      input: [345, 23, 8679, 20, 22, 23, 599, 4],
      expected: [4, 20, 22, 23, 23, 345, 599, 8679],
    },
    {
      level: 'hard',
      input: [883, 240, 678, 6789, 456, 967894],
      expected: [240, 456, 678, 883, 6789, 967894],
    },
  ];

  it.each(cases)(
    'should return $expected when $level level whith $input',
    ({ input, expected }) => {
      // GIVEN
      const caseInput = input;

      // WHEN
      const result = sortInput(caseInput);

      // THEN
      expect(result).toEqual(expected);
    },
  );
});
