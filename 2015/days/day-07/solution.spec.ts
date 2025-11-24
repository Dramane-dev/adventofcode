import { BITWISE_OPERATOR_ENUM } from './constants';
import { findSpecificWireSignalRecursively, prepareWireInstructions } from './recursive-solution';
import { hasSignalValue, applyInstruction, findSpecificWireSignal } from './solution';
import { formatExecutionTime, parseInstruction } from './utils';

describe('Day 7: Some Assembly Required', () => {
  describe('parseInstruction', () => {
    const cases = [
      {
        level: 'direct value assignment',
        input: '123 -> x',
        expected: {
          operator: undefined,
          wires: ['123'],
          targetWireName: 'x',
        },
      },
      {
        level: 'wire to wire assignment',
        input: 'x -> y',
        expected: {
          operator: undefined,
          wires: ['x'],
          targetWireName: 'y',
        },
      },
      {
        level: 'large direct value',
        input: '65535 -> max',
        expected: {
          operator: undefined,
          wires: ['65535'],
          targetWireName: 'max',
        },
      },
      {
        level: 'NOT operation (unary)',
        input: 'NOT x -> h',
        expected: {
          operator: BITWISE_OPERATOR_ENUM.NOT,
          wires: ['x'],
          targetWireName: 'h',
        },
      },
      {
        level: 'AND operation',
        input: 'x AND y -> d',
        expected: {
          operator: BITWISE_OPERATOR_ENUM.AND,
          wires: ['x', 'y'],
          targetWireName: 'd',
        },
      },
      {
        level: 'AND operation starting with a signal value',
        input: '1 AND gy -> gz',
        expected: {
          operator: BITWISE_OPERATOR_ENUM.AND,
          wires: ['1', 'gy'],
          targetWireName: 'gz',
        },
      },
      {
        level: 'AND with direct value',
        input: '1 AND cx -> cy',
        expected: {
          operator: BITWISE_OPERATOR_ENUM.AND,
          wires: ['1', 'cx'],
          targetWireName: 'cy',
        },
      },
      {
        level: 'AND with direct values',
        input: '1 AND 1 -> cy',
        expected: {
          operator: BITWISE_OPERATOR_ENUM.AND,
          wires: ['1', '1'],
          targetWireName: 'cy',
        },
      },
      {
        level: 'complex wire names',
        input: 'lf AND lq -> ls',
        expected: {
          operator: BITWISE_OPERATOR_ENUM.AND,
          wires: ['lf', 'lq'],
          targetWireName: 'ls',
        },
      },
      {
        level: 'OR operation',
        input: 'x OR y -> e',
        expected: {
          operator: BITWISE_OPERATOR_ENUM.OR,
          wires: ['x', 'y'],
          targetWireName: 'e',
        },
      },
      {
        level: 'OR operation with direct signal value',
        input: 'x OR 2 -> e',
        expected: {
          operator: BITWISE_OPERATOR_ENUM.OR,
          wires: ['x', '2'],
          targetWireName: 'e',
        },
      },
      {
        level: 'OR operation with direct signal values',
        input: '1 OR 2 -> e',
        expected: {
          operator: BITWISE_OPERATOR_ENUM.OR,
          wires: ['1', '2'],
          targetWireName: 'e',
        },
      },
      {
        level: 'LSHIFT operation',
        input: 'x LSHIFT 2 -> f',
        expected: {
          operator: BITWISE_OPERATOR_ENUM.LSHIFT,
          wires: ['x'],
          shiftedValue: 2,
          targetWireName: 'f',
        },
      },
      {
        level: 'RSHIFT operation',
        input: 'y RSHIFT 2 -> g',
        expected: {
          operator: BITWISE_OPERATOR_ENUM.RSHIFT,
          wires: ['y'],
          shiftedValue: 2,
          targetWireName: 'g',
        },
      },
      {
        level: 'RSHIFT operation',
        input: '1 RSHIFT 2 -> g',
        expected: {
          operator: BITWISE_OPERATOR_ENUM.RSHIFT,
          wires: ['1'],
          shiftedValue: 2,
          targetWireName: 'g',
        },
      },
    ];

    it.each(cases)(
      'should return $expected when $level level with $input',
      ({ input, expected }) => {
        // GIVEN
        // WHEN
        const result = parseInstruction(input);

        // THEN
        expect(result).toMatchObject(expected);
      },
    );
  });
  describe('hasSignalValue', () => {
    const cases = [
      {
        level: 'direct value assignment',
        input: '123 -> x',
        wiresWithSignals: new Map<string, number>([['x', 123]]),
        expected: true,
      },
      {
        level: 'large direct value',
        input: '65535 -> max',
        wiresWithSignals: new Map<string, number>([]),
        expected: true,
      },
      {
        level: 'wire to wire assignment',
        input: 'x -> y',
        wiresWithSignals: new Map<string, number>([['x', 123]]),
        expected: true,
      },
      {
        level: 'NOT operation (unary)',
        input: 'NOT x -> h',
        wiresWithSignals: new Map<string, number>([['x', 123]]),
        expected: true,
      },
      {
        level: 'AND operation',
        input: 'x AND y -> d',
        wiresWithSignals: new Map<string, number>([['x', 123]]),
        expected: false,
      },
      {
        level: 'AND operation starting with a signal value',
        input: '1 AND gy -> gz',
        wiresWithSignals: new Map<string, number>([['gy', 2]]),
        expected: true,
      },
      {
        level: 'AND with direct value',
        input: '1 AND cx -> cy',
        wiresWithSignals: new Map<string, number>([]),
        expected: false,
      },
      {
        level: 'AND with direct values',
        input: '1 AND 1 -> cy',
        wiresWithSignals: new Map<string, number>([]),
        expected: true,
      },
      {
        level: 'complex wire names',
        input: 'lf AND lq -> ls',
        wiresWithSignals: new Map<string, number>([
          ['lf', 1],
          ['lq', 1],
        ]),
        expected: true,
      },
      {
        level: 'OR operation',
        input: 'x OR y -> e',
        wiresWithSignals: new Map<string, number>([['x', 123]]),
        expected: false,
      },
      {
        level: 'OR operation with direct signal value',
        input: 'x OR 2 -> e',
        wiresWithSignals: new Map<string, number>([['x', 123]]),
        expected: true,
      },
      {
        level: 'OR operation with direct signal values',
        input: '1 OR 2 -> e',
        wiresWithSignals: new Map<string, number>([]),
        expected: true,
      },
      {
        level: 'LSHIFT operation',
        input: 'x LSHIFT 2 -> f',
        wiresWithSignals: new Map<string, number>([['x', 123]]),
        expected: true,
      },
      {
        level: 'LSHIFT operation with direct value',
        input: '1 LSHIFT 2 -> f',
        wiresWithSignals: new Map<string, number>([]),
        expected: true,
      },
      {
        level: 'LSHIFT operation with an unknown wire',
        input: 'y LSHIFT 2 -> g',
        wiresWithSignals: new Map<string, number>([]),
        expected: false,
      },
      {
        level: 'RSHIFT operation',
        input: 'y RSHIFT 2 -> g',
        wiresWithSignals: new Map<string, number>([]),
        expected: false,
      },
      {
        level: 'RSHIFT operation with direct value',
        input: '1 RSHIFT 2 -> g',
        wiresWithSignals: new Map<string, number>([]),
        expected: true,
      },
      {
        level: 'RSHIFT operation with an unknown wire',
        input: 'y RSHIFT 2 -> g',
        wiresWithSignals: new Map<string, number>([]),
        expected: false,
      },
    ];

    it.each(cases)(
      'should return $expected when $level level with $input',
      ({ input, wiresWithSignals, expected }) => {
        // GIVEN
        const parsedInstruction = parseInstruction(input);

        // WHEN
        const result = hasSignalValue({ wiresWithSignals, parsedInstruction });

        // THEN
        expect(result).toBe(expected);
      },
    );
  });
  describe('applyInstruction', () => {
    const cases = [
      {
        level: 'direct signal value assignment',
        input: '123 -> x',
        wiresWithSignals: new Map<string, number>([['x', 123]]),
        expected: new Map([['x', 123]]),
      },
      {
        level: 'large direct signal value',
        input: '65535 -> max',
        wiresWithSignals: new Map<string, number>([]),
        expected: new Map([['max', 65535]]),
      },
      {
        level: 'wire to wire assignment',
        input: 'x -> y',
        wiresWithSignals: new Map<string, number>([['x', 123]]),
        expected: new Map([
          ['x', 123],
          ['y', 123],
        ]),
      },
      {
        level: 'wire to unknown wire assignment',
        input: 'x -> y',
        wiresWithSignals: new Map<string, number>([]),
        expected: new Map([]),
      },
      {
        level: 'NOT operation (unary)',
        input: 'NOT x -> h',
        wiresWithSignals: new Map<string, number>([['x', 123]]),
        expected: new Map([
          ['x', 123],
          ['h', 65412],
        ]),
      },
      {
        level: 'NOT operation (unary) with unknown wire',
        input: 'NOT x -> h',
        wiresWithSignals: new Map<string, number>([]),
        expected: new Map([]),
      },
      {
        level: 'NOT operation (unary) with direct signal value',
        input: 'NOT 123 -> h',
        wiresWithSignals: new Map<string, number>([]),
        expected: new Map([['h', 65412]]),
      },
      {
        level: 'AND operation',
        input: 'x AND y -> d',
        wiresWithSignals: new Map<string, number>([
          ['x', 123],
          ['y', 123],
        ]),
        expected: new Map([
          ['x', 123],
          ['y', 123],
          ['d', 123],
        ]),
      },
      {
        level: 'AND operation starting with a signal value',
        input: '1 AND gy -> gz',
        wiresWithSignals: new Map<string, number>([['gy', 1]]),
        expected: new Map([
          ['gy', 1],
          ['gz', 1],
        ]),
      },
      {
        level: 'AND operation contains an unknown wire',
        input: 'x AND gy -> gz',
        wiresWithSignals: new Map<string, number>([['gy', 2]]),
        expected: new Map([['gy', 2]]),
      },
      {
        level: 'AND operation contains unknown wires',
        input: 'x AND gy -> gz',
        wiresWithSignals: new Map<string, number>([]),
        expected: new Map([]),
      },
      {
        level: 'AND with direct value',
        input: '1 AND cx -> cy',
        wiresWithSignals: new Map<string, number>([['cx', 2]]),
        expected: new Map([
          ['cx', 2],
          ['cy', 0],
        ]),
      },
      {
        level: 'AND with direct values',
        input: '1 AND 1 -> cy',
        wiresWithSignals: new Map<string, number>([]),
        expected: new Map([['cy', 1]]),
      },
      {
        level: 'complex wire names',
        input: 'lf AND lq -> ls',
        wiresWithSignals: new Map<string, number>([
          ['lf', 1],
          ['lq', 1],
        ]),
        expected: new Map([
          ['lf', 1],
          ['lq', 1],
          ['ls', 1],
        ]),
      },
      {
        level: 'OR operation',
        input: 'x OR y -> e',
        wiresWithSignals: new Map<string, number>([
          ['x', 123],
          ['y', 123],
        ]),
        expected: new Map([
          ['x', 123],
          ['y', 123],
          ['e', 123],
        ]),
      },
      {
        level: 'OR operation with an unknown wire',
        input: 'x OR y -> e',
        wiresWithSignals: new Map<string, number>([['x', 123]]),
        expected: new Map([['x', 123]]),
      },
      {
        level: 'OR operation with direct signal value',
        input: 'x OR 2 -> e',
        wiresWithSignals: new Map<string, number>([['x', 123]]),
        expected: new Map([
          ['x', 123],
          ['e', 123],
        ]),
      },
      {
        level: 'OR operation with direct signal values',
        input: '1 OR 2 -> e',
        wiresWithSignals: new Map<string, number>([]),
        expected: new Map([['e', 3]]),
      },
      {
        level: 'LSHIFT operation',
        input: 'x LSHIFT 2 -> f',
        wiresWithSignals: new Map<string, number>([['x', 123]]),
        expected: new Map([
          ['x', 123],
          ['f', 492],
        ]),
      },
      {
        level: 'LSHIFT operation with an unknown wire',
        input: 'x LSHIFT 2 -> f',
        wiresWithSignals: new Map<string, number>([]),
        expected: new Map([]),
      },
      {
        level: 'LSHIFT operation with direct signal value',
        input: '1 LSHIFT 2 -> g',
        wiresWithSignals: new Map<string, number>([]),
        expected: new Map([['g', 4]]),
      },
      {
        level: 'RSHIFT operation',
        input: 'y RSHIFT 2 -> g',
        wiresWithSignals: new Map<string, number>([['y', 100]]),
        expected: new Map([
          ['y', 100],
          ['g', 25],
        ]),
      },
      {
        level: 'RSHIFT operation with an unknown wire',
        input: 'y RSHIFT 2 -> g',
        wiresWithSignals: new Map<string, number>([]),
        expected: new Map([]),
      },
      {
        level: 'RSHIFT operation  with direct signal value',
        input: '1 RSHIFT 2 -> g',
        wiresWithSignals: new Map<string, number>([]),
        expected: new Map([['g', 0]]),
      },
    ];

    it.each(cases)(
      'should return $expected when $level level with $input',
      ({ input, wiresWithSignals, expected }) => {
        // GIVEN
        const parsedInstruction = parseInstruction(input);

        // WHEN
        applyInstruction({ wiresWithSignals, parsedInstruction });

        // THEN
        expect(wiresWithSignals).toEqual(expected);
      },
    );
  });
  describe('findSpecificWireSignal', () => {
    const cases = [
      {
        level: 'large direct value',
        input: ['65535 -> a'],
        expected: 65535,
      },
      {
        level: 'wire to wire assignment',
        input: ['123 -> x', 'x -> a'],
        expected: 123,
      },
      {
        level: 'NOT operation (unary)',
        input: ['123 -> x', 'NOT x -> a'],
        expected: 65412,
      },
      {
        level: 'AND operation',
        input: ['123 -> x', '456 -> y', 'x AND y -> a'],
        expected: 72,
      },
      {
        level: 'AND operation starting with a signal value',
        input: ['123 -> gy', '1 AND gy -> a'],
        expected: 1,
      },
      {
        level: 'AND with direct values',
        input: ['1 AND 1 -> a'],
        expected: 1,
      },
      {
        level: 'AND operation starting with an unknown wire',
        input: ['1 AND gy -> a'],
        expected: undefined,
      },
      {
        level: 'complex wire names',
        input: ['123 -> lf', '456 -> lq', 'lf AND lq -> a'],
        expected: 72,
      },
      {
        level: 'OR operation',
        input: ['123 -> x', '456 -> y', 'x OR y -> a'],
        expected: 507,
      },
      {
        level: 'OR operation with direct signal value',
        input: ['123 -> x', 'x OR 2 -> a'],
        expected: 123,
      },
      {
        level: 'OR operation with direct signal values',
        input: ['1 OR 2 -> a'],
        expected: 3,
      },
      {
        level: 'OR operation with unknown wire',
        input: ['x OR 2 -> a'],
        expected: undefined,
      },
      {
        level: 'LSHIFT operation',
        input: ['123 -> x', 'x LSHIFT 2 -> a'],
        expected: 492,
      },
      {
        level: 'LSHIFT operation with direct value',
        input: ['1 LSHIFT 2 -> a'],
        expected: 4,
      },
      {
        level: 'LSHIFT operation with an unknown wire',
        input: ['y LSHIFT 2 -> a'],
        expected: undefined,
      },
      {
        level: 'RSHIFT operation',
        input: ['456 -> y', 'y RSHIFT 2 -> a'],
        expected: 114,
      },
      {
        level: 'RSHIFT operation with direct value',
        input: ['1 RSHIFT 2 -> a'],
        expected: 0,
      },
      {
        level: 'RSHIFT operation with an unknown wire',
        input: ['y RSHIFT 2 -> a'],
        expected: undefined,
      },
      {
        level: 'multiple instructions',
        input: [
          '123 -> x',
          '456 -> y',
          'x AND y -> d',
          'x OR y -> a',
          'x LSHIFT 2 -> f',
          'y RSHIFT 2 -> g',
          'NOT x -> h',
          'NOT y -> i',
        ],
        expected: 507,
      },
    ];

    it.each(cases)(
      'should return $expected when $level level with $input',
      ({ input, expected }) => {
        // GIVEN
        // WHEN
        const result = findSpecificWireSignal(input);

        // THEN
        expect(result).toBe(expected);
      },
    );
  });
  describe('prepareWireInstructions', () => {
    const cases = [
      {
        level: 'direct signal value assignment',
        input: ['123 -> x'],
        expected: new Map([['x', '123 -> x']]),
      },
      {
        level: 'wire to wire assignment',
        input: ['x -> y'],
        expected: new Map([['y', 'x -> y']]),
      },
      {
        level: 'NOT operation (unary)',
        input: ['NOT x -> h'],
        expected: new Map([['h', 'NOT x -> h']]),
      },
      {
        level: 'AND operation',
        input: ['x AND y -> d'],
        expected: new Map([['d', 'x AND y -> d']]),
      },
      {
        level: 'complex wire names',
        input: ['lf AND lq -> ls'],
        expected: new Map([['ls', 'lf AND lq -> ls']]),
      },
      {
        level: 'OR operation',
        input: ['x OR y -> e'],
        expected: new Map([['e', 'x OR y -> e']]),
      },
      {
        level: 'LSHIFT operation',
        input: ['x LSHIFT 2 -> f'],
        expected: new Map([['f', 'x LSHIFT 2 -> f']]),
      },
      {
        level: 'RSHIFT operation',
        input: ['y RSHIFT 2 -> g'],
        expected: new Map([['g', 'y RSHIFT 2 -> g']]),
      },
      {
        level: 'multiple operations',
        input: ['123 -> x', 'x -> y', 'NOT x -> h', 'x AND y -> d'],
        expected: new Map([
          ['x', '123 -> x'],
          ['y', 'x -> y'],
          ['h', 'NOT x -> h'],
          ['d', 'x AND y -> d'],
        ]),
      },
    ];
    it.each(cases)(
      'should return $expected when $level level with $input',
      ({ input, expected }) => {
        // GIVEN
        // WHEN
        const result = prepareWireInstructions(input);

        // THEN
        expect(result).toEqual(expected);
      },
    );
  });
  describe('findSpecificWireSignalRecursively', () => {
    const recursiveCases = [
      // ============================================
      // BASIC CASES - Direct assignments
      // ============================================
      {
        level: 'direct value to wire',
        inputs: ['123 -> a'],
        wireToSearch: 'a',
        expected: 123,
      },
      {
        level: 'large direct value',
        inputs: ['65535 -> a'],
        wireToSearch: 'a',
        expected: 65535,
      },
      {
        level: 'wire to wire assignment',
        inputs: ['123 -> x', 'x -> a'],
        wireToSearch: 'a',
        expected: 123,
      },
      {
        level: 'chained wire assignments',
        inputs: ['123 -> x', 'x -> y', 'y -> z', 'z -> a'],
        wireToSearch: 'a',
        expected: 123,
      },

      // ============================================
      // NOT OPERATOR (Unary)
      // ============================================
      {
        level: 'NOT operation',
        inputs: ['123 -> x', 'NOT x -> a'],
        wireToSearch: 'a',
        expected: 65412,
      },
      {
        level: 'NOT with direct value',
        inputs: ['NOT 123 -> a'],
        wireToSearch: 'a',
        expected: 65412,
      },
      {
        level: 'chained NOT operations',
        inputs: ['123 -> x', 'NOT x -> y', 'NOT y -> a'],
        wireToSearch: 'a',
        expected: 123,
      },

      // ============================================
      // AND OPERATOR
      // ============================================
      {
        level: 'AND operation with two wires',
        inputs: ['123 -> x', '456 -> y', 'x AND y -> a'],
        wireToSearch: 'a',
        expected: 72,
      },
      {
        level: 'AND with signal and wire',
        inputs: ['123 -> x', '1 AND x -> a'],
        wireToSearch: 'a',
        expected: 1,
      },
      {
        level: 'AND with wire and signal',
        inputs: ['123 -> x', 'x AND 1 -> a'],
        wireToSearch: 'a',
        expected: 1,
      },
      {
        level: 'AND with two direct values',
        inputs: ['5 AND 3 -> a'],
        wireToSearch: 'a',
        expected: 1,
      },

      // ============================================
      // OR OPERATOR
      // ============================================
      {
        level: 'OR operation with two wires',
        inputs: ['123 -> x', '456 -> y', 'x OR y -> a'],
        wireToSearch: 'a',
        expected: 507,
      },
      {
        level: 'OR with signal and wire',
        inputs: ['123 -> x', '1 OR x -> a'],
        wireToSearch: 'a',
        expected: 123,
      },
      {
        level: 'OR with two direct values',
        inputs: ['1 OR 2 -> a'],
        wireToSearch: 'a',
        expected: 3,
      },

      // ============================================
      // LSHIFT OPERATOR
      // ============================================
      {
        level: 'LSHIFT operation',
        inputs: ['123 -> x', 'x LSHIFT 2 -> a'],
        wireToSearch: 'a',
        expected: 492,
      },
      {
        level: 'LSHIFT with direct value',
        inputs: ['1 LSHIFT 2 -> a'],
        wireToSearch: 'a',
        expected: 4,
      },
      {
        level: 'LSHIFT with large shift',
        inputs: ['1 LSHIFT 15 -> a'],
        wireToSearch: 'a',
        expected: 32768,
      },

      // ============================================
      // RSHIFT OPERATOR
      // ============================================
      {
        level: 'RSHIFT operation',
        inputs: ['456 -> y', 'y RSHIFT 2 -> a'],
        wireToSearch: 'a',
        expected: 114,
      },
      {
        level: 'RSHIFT with direct value',
        inputs: ['8 RSHIFT 2 -> a'],
        wireToSearch: 'a',
        expected: 2,
      },
      {
        level: 'RSHIFT resulting in zero',
        inputs: ['1 RSHIFT 2 -> a'],
        wireToSearch: 'a',
        expected: 0,
      },

      // ============================================
      // COMPLEX CHAINS - Multiple dependencies
      // ============================================
      {
        level: 'complex chain with multiple operations',
        inputs: ['2 -> x', 'x LSHIFT 1 -> y', 'y OR x -> z', 'NOT z -> a'],
        wireToSearch: 'a',
        expected: 65529,
      },
      {
        level: 'diamond dependency pattern',
        inputs: ['5 -> b', 'b -> c', 'b -> d', 'c AND d -> a'],
        wireToSearch: 'a',
        expected: 5,
      },
      {
        level: 'multiple wire reuse (cache test)',
        inputs: ['123 -> x', 'x -> y', 'x -> z', 'y AND z -> a'],
        wireToSearch: 'a',
        expected: 123,
      },
      {
        level: 'deep nested dependencies',
        inputs: ['2 -> a', 'a -> b', 'b -> c', 'c -> d', 'd -> e', 'e -> f'],
        wireToSearch: 'f',
        expected: 2,
      },

      // ============================================
      // OFFICIAL EXAMPLE from puzzle
      // ============================================
      {
        level: 'full example circuit from puzzle',
        inputs: [
          '123 -> x',
          '456 -> y',
          'x AND y -> d',
          'x OR y -> e',
          'x LSHIFT 2 -> f',
          'y RSHIFT 2 -> g',
          'NOT x -> h',
          'NOT y -> i',
        ],
        wireToSearch: 'd',
        expected: 72,
      },
      {
        level: 'full example - wire e',
        inputs: [
          '123 -> x',
          '456 -> y',
          'x AND y -> d',
          'x OR y -> e',
          'x LSHIFT 2 -> f',
          'y RSHIFT 2 -> g',
          'NOT x -> h',
          'NOT y -> i',
        ],
        wireToSearch: 'e',
        expected: 507,
      },
      {
        level: 'full example - wire f',
        inputs: [
          '123 -> x',
          '456 -> y',
          'x AND y -> d',
          'x OR y -> e',
          'x LSHIFT 2 -> f',
          'y RSHIFT 2 -> g',
          'NOT x -> h',
          'NOT y -> i',
        ],
        wireToSearch: 'f',
        expected: 492,
      },
      {
        level: 'full example - wire g',
        inputs: [
          '123 -> x',
          '456 -> y',
          'x AND y -> d',
          'x OR y -> e',
          'x LSHIFT 2 -> f',
          'y RSHIFT 2 -> g',
          'NOT x -> h',
          'NOT y -> i',
        ],
        wireToSearch: 'g',
        expected: 114,
      },
      {
        level: 'full example - wire h',
        inputs: [
          '123 -> x',
          '456 -> y',
          'x AND y -> d',
          'x OR y -> e',
          'x LSHIFT 2 -> f',
          'y RSHIFT 2 -> g',
          'NOT x -> h',
          'NOT y -> i',
        ],
        wireToSearch: 'h',
        expected: 65412,
      },
      {
        level: 'full example - wire i',
        inputs: [
          '123 -> x',
          '456 -> y',
          'x AND y -> d',
          'x OR y -> e',
          'x LSHIFT 2 -> f',
          'y RSHIFT 2 -> g',
          'NOT x -> h',
          'NOT y -> i',
        ],
        wireToSearch: 'i',
        expected: 65079,
      },
      {
        level: 'full example - wire x (source)',
        inputs: [
          '123 -> x',
          '456 -> y',
          'x AND y -> d',
          'x OR y -> e',
          'x LSHIFT 2 -> f',
          'y RSHIFT 2 -> g',
          'NOT x -> h',
          'NOT y -> i',
        ],
        wireToSearch: 'x',
        expected: 123,
      },

      // ============================================
      // EDGE CASES
      // ============================================
      {
        level: 'zero value',
        inputs: ['0 -> a'],
        wireToSearch: 'a',
        expected: 0,
      },
      {
        level: 'operations with zero',
        inputs: ['0 -> x', 'x AND 5 -> a'],
        wireToSearch: 'a',
        expected: 0,
      },
      {
        level: 'NOT zero',
        inputs: ['0 -> x', 'NOT x -> a'],
        wireToSearch: 'a',
        expected: 65535,
      },
      {
        level: 'complex wire names',
        inputs: ['123 -> lf', '456 -> lq', 'lf AND lq -> a'],
        wireToSearch: 'a',
        expected: 72,
      },
      {
        level: 'unordered instructions',
        inputs: ['x AND y -> a', '456 -> y', '123 -> x'],
        wireToSearch: 'a',
        expected: 72,
      },
      {
        level: 'deeply unordered instructions',
        inputs: ['d OR e -> a', 'x AND y -> d', 'x OR y -> e', '456 -> y', '123 -> x'],
        wireToSearch: 'a',
        expected: 507,
      },

      // ============================================
      // CACHE EFFICIENCY TEST
      // ============================================
      {
        level: 'wire used multiple times (tests memoization)',
        inputs: ['100 -> x', 'x AND x -> y', 'x OR y -> z', 'y AND z -> a'],
        wireToSearch: 'a',
        expected: 100,
      },
    ];

    it.each(recursiveCases)(
      'should return $expected when $level level with $inputs',
      ({ inputs, wireToSearch, expected }) => {
        // GIVEN
        // WHEN
        const result = findSpecificWireSignalRecursively({ inputs, wireToSearch });

        // THEN
        expect(result).toEqual(expected);
      },
    );
  });
  describe('formatExecutionTime', () => {
    const cases = [
      {
        level: 'milliseconds',
        input: 50,
        expected: '50ms',
      },
      {
        level: 'milliseconds',
        input: 100,
        expected: '100ms',
      },
      {
        level: 'milliseconds',
        input: 856,
        expected: '856ms',
      },
      {
        level: 'milliseconds',
        input: 999,
        expected: '999ms',
      },
      {
        level: 'seconds',
        input: 1_000,
        expected: '1s',
      },
      {
        level: 'seconds',
        input: 1_001,
        expected: '1s',
      },
      {
        level: 'seconds',
        input: 5_789,
        expected: '6s',
      },
      {
        level: 'seconds',
        input: 59_789,
        expected: '60s',
      },
      {
        level: 'minutes',
        input: 60_000,
        expected: '1m',
      },
      {
        level: 'minutes',
        input: 2_870_781,
        expected: '48m',
      },
      {
        level: 'minutes',
        input: 3_456_908,
        expected: '58m',
      },
      {
        level: 'minutes',
        input: 3_589_123,
        expected: '60m',
      },
      {
        level: 'hours',
        input: 3_600_000,
        expected: '1h',
      },
      {
        level: 'hours',
        input: 5_870_781,
        expected: '2h',
      },
      {
        level: 'hours',
        input: 11_456_908,
        expected: '3h',
      },
      {
        level: 'hours',
        input: 125_589_123,
        expected: '35h',
      },
    ];

    it.each(cases)(
      'should return $expected when $level level with $input',
      ({ input, expected }) => {
        // GIVEN
        // WHEN
        const result = formatExecutionTime(input);

        // THEN
        expect(result).toEqual(expected);
      },
    );
  });
});
