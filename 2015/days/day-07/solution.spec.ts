import { BITWISE_OPERATOR_ENUM } from './constants';
import { hasSignalValue, applyInstruction, findSpecificWireSignal } from './solution';
import { parseInstruction } from './utils';

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
  describe('hasSignalValue', () => {
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
});
