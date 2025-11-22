import { BITWISE_OPERATOR_ENUM } from './constants';

export type BitwiseOperatorsType = keyof typeof BITWISE_OPERATOR_ENUM;

export type BinaryOperatorType = Extract<BitwiseOperatorsType, 'AND' | 'OR' | 'NOT'>;
export type RightOrLeftShiftOperatorType = Extract<BitwiseOperatorsType, 'RSHIFT' | 'LSHIFT'>;

export type ParsedInstructionType = {
  operator?: BitwiseOperatorsType;
  wires: string[];
  shiftedValue?: number;
  targetWireName: string;
};

export type WiresWithSignalsType = Map<string, number>;
