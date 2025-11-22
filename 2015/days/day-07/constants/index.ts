import {
  BinaryOperatorType,
  BitwiseOperatorsType,
  RightOrLeftShiftOperatorType,
} from '../index.type';

export enum BITWISE_OPERATOR_ENUM {
  NOT = 'NOT',
  AND = 'AND',
  OR = 'OR',
  RSHIFT = 'RSHIFT',
  LSHIFT = 'LSHIFT',
}

export const SHIFT_OPERATORS: RightOrLeftShiftOperatorType[] = ['RSHIFT', 'LSHIFT'] as const;
export const LOGICAL_OPERATORS: BinaryOperatorType[] = ['AND', 'OR'] as const;
export const BINARY_OPERATORS: BinaryOperatorType[] = ['AND', 'OR', 'NOT'] as const;
export const BITWISE_OPERATORS: BitwiseOperatorsType[] = [
  'AND',
  'OR',
  'NOT',
  'RSHIFT',
  'LSHIFT',
] as const;
