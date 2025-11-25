import { BITWISE_OPERATOR_ENUM, BITWISE_OPERATORS, LOGICAL_OPERATORS } from '../constants';
import { BitwiseOperatorsType, ParsedInstructionType, WiresWithSignalsType } from '../index.type';

export const mapExtractedOperatorToBitwiseOperator = (operator: string) => {
  const operatorMapper: Record<string, BITWISE_OPERATOR_ENUM> = {
    AND: BITWISE_OPERATOR_ENUM.AND,
    OR: BITWISE_OPERATOR_ENUM.OR,
    RSHIFT: BITWISE_OPERATOR_ENUM.RSHIFT,
    LSHIFT: BITWISE_OPERATOR_ENUM.LSHIFT,
  };

  return operatorMapper[operator];
};

export const isBitwiseOperator = (instruction: string) => {
  return (
    BITWISE_OPERATORS.filter((operator) => {
      return instruction.includes(operator);
    }).length > 0
  );
};

export const isLogicalOperator = (instruction: string) => {
  return (
    LOGICAL_OPERATORS.filter((operator) => {
      return instruction.includes(operator);
    }).length > 0
  );
};

export const isUnaryOperator = (instruction: string) => {
  return instruction.includes(BITWISE_OPERATOR_ENUM.NOT);
};

export const isRorLShiftOperator = (instruction: string) => {
  return (
    instruction === BITWISE_OPERATOR_ENUM.RSHIFT || instruction === BITWISE_OPERATOR_ENUM.LSHIFT
  );
};

export const isNumeric = (value: string) => {
  const convertedValue = Number(value);
  return !isNaN(convertedValue) && Number.isInteger(convertedValue);
};

const MS_PER_SECOND = 1000;
const MS_PER_MINUTE = 60 * 1000;
const MS_PER_HOUR = 60 * 60 * 1000;

export const formatExecutionTime = (ms: number) => {
  if (ms < 1000) {
    return `${ms}ms`;
  }

  if (ms >= 1000 && ms < 60_000) {
    const seconds = Math.round(ms / MS_PER_SECOND);
    return `${seconds}s`;
  }

  if (ms >= 60_000 && ms < 3_600_000) {
    const minutes = Math.round(ms / MS_PER_MINUTE);
    return `${minutes}m`;
  }

  if (ms >= 3_600_000) {
    const hours = Math.round(ms / MS_PER_HOUR);
    return `${hours}h`;
  }

  return '0ms';
};

const parseInstructionWithUnaryOperation = (instructions: string[]): ParsedInstructionType => {
  return {
    operator: BITWISE_OPERATOR_ENUM.NOT,
    wires: [instructions[1]],
    targetWireName: instructions[3],
  };
};

const parseROrLShiftInstruction = (instructions: string[]): ParsedInstructionType => {
  return {
    operator: mapExtractedOperatorToBitwiseOperator(instructions[1]),
    wires: [instructions[0]],
    shiftedValue: Number(instructions[2]),
    targetWireName: instructions[4],
  };
};

const parseBinaryInstruction = (instructions: string[]): ParsedInstructionType => {
  return {
    operator: mapExtractedOperatorToBitwiseOperator(instructions[1]),
    wires: [instructions[0], instructions[2]],
    targetWireName: instructions[4],
  };
};

const parseInstructionWithBinaryOperation = (instructions: string[]): ParsedInstructionType => {
  if (!isRorLShiftOperator(instructions[1])) {
    return parseBinaryInstruction(instructions);
  }

  return parseROrLShiftInstruction(instructions);
};

const parseInstructionWithoutOperation = (instructions: string[]): ParsedInstructionType => {
  return {
    operator: undefined,
    wires: [instructions[0]],
    targetWireName: instructions[2],
  };
};

export const parseInstruction = (instruction: string) => {
  const splitededInstruction = instruction.split(' ');

  if (!isBitwiseOperator(instruction)) {
    return parseInstructionWithoutOperation(splitededInstruction);
  }

  if (!isUnaryOperator(instruction)) {
    return parseInstructionWithBinaryOperation(splitededInstruction);
  }

  return parseInstructionWithUnaryOperation(splitededInstruction);
};

export const applyDirectAssignmentInstruction = ({
  wiresWithSignals,
  parsedInstruction,
}: {
  wiresWithSignals: Map<string, number>;
  parsedInstruction: ParsedInstructionType;
}) => {
  if (!isNumeric(parsedInstruction.wires[0])) {
    const wire = wiresWithSignals.get(parsedInstruction.wires[0]);

    if (!wire) {
      return;
    }

    return wiresWithSignals.set(parsedInstruction.targetWireName, wire & 0xffff);
  }

  return wiresWithSignals.set(
    parsedInstruction.targetWireName,
    Number(parsedInstruction.wires[0]) & 0xffff,
  );
};

const applyAndInstruction = (a: number, b: number) => a & b & 0xffff;
const applyOrInstruction = (a: number, b: number) => (a | b) & 0xffff;
const applyRightShiftInstruction = (a: number, b: number) => (a >> b) & 0xffff;
const applyLeftShiftInstruction = (a: number, b: number) => (a << b) & 0xffff;
const applyNotInstruction = (a: number) => ~a & 0xffff;

const BITWISE_OPERATION_MAP = {
  [BITWISE_OPERATOR_ENUM.AND]: applyAndInstruction,
  [BITWISE_OPERATOR_ENUM.OR]: applyOrInstruction,
  [BITWISE_OPERATOR_ENUM.RSHIFT]: applyRightShiftInstruction,
  [BITWISE_OPERATOR_ENUM.LSHIFT]: applyLeftShiftInstruction,
  [BITWISE_OPERATOR_ENUM.NOT]: applyNotInstruction,
} as const;

export const mapBitwiseOperatorToOperationFunction = ({
  operator,
  firstSignal,
  secondSignal,
}: {
  operator: BitwiseOperatorsType;
  firstSignal: number;
  secondSignal: number;
}) => {
  return BITWISE_OPERATION_MAP[operator](firstSignal, secondSignal);
};

export const assertIsBitwiseOperator = (
  operator?: ParsedInstructionType['operator'],
): operator is BitwiseOperatorsType => {
  return !!operator && BITWISE_OPERATORS.includes(operator as BitwiseOperatorsType);
};

const getFirstSignal = ({
  wires,
  wiresWithSignals,
}: {
  wires: ParsedInstructionType['wires'];
  wiresWithSignals: WiresWithSignalsType;
}) => {
  return isNumeric(wires[0]) ? Number(wires[0]) : wiresWithSignals.get(wires[0]);
};

const getSecondSignal = ({
  operator,
  wires,
  shiftedValue,
  wiresWithSignals,
}: {
  operator: BitwiseOperatorsType;
  shiftedValue: ParsedInstructionType['shiftedValue'];
  wires: ParsedInstructionType['wires'];
  wiresWithSignals: WiresWithSignalsType;
}) => {
  if (isUnaryOperator(operator)) {
    return 0;
  }

  if (isRorLShiftOperator(operator)) {
    return shiftedValue;
  }

  if (isLogicalOperator(operator) && isNumeric(wires[1])) {
    return Number(wires[1]);
  }

  return wiresWithSignals.get(wires[1]);
};

const canApplyInstruction = (
  operator: BitwiseOperatorsType,
  firstSignal?: number | undefined,
  secondSignal?: number | undefined,
): firstSignal is number => {
  const isReadyToApplyLogicalInstruction =
    isLogicalOperator(operator) && secondSignal !== undefined;
  const isReadyToApplyRorLShiftInstruction =
    isRorLShiftOperator(operator) && secondSignal !== undefined;

  // handle unknown wire case instruction: x AND y -> d | x OR y -> d
  return (
    firstSignal !== undefined &&
    (isUnaryOperator(operator) ||
      isReadyToApplyLogicalInstruction ||
      isReadyToApplyRorLShiftInstruction)
  );
};

export const applyOperatorInstruction = ({
  wiresWithSignals,
  parsedInstruction,
}: {
  wiresWithSignals: WiresWithSignalsType;
  parsedInstruction: ParsedInstructionType;
}) => {
  const { operator, wires, shiftedValue, targetWireName } = parsedInstruction;

  if (!assertIsBitwiseOperator(operator)) {
    return;
  }

  const firstSignal = getFirstSignal({ wires, wiresWithSignals });
  const secondSignal = getSecondSignal({ operator, wires, shiftedValue, wiresWithSignals });

  if (!canApplyInstruction(operator, firstSignal, secondSignal)) {
    return;
  }

  return wiresWithSignals.set(
    targetWireName,
    mapBitwiseOperatorToOperationFunction({
      operator: operator,
      firstSignal,
      secondSignal: secondSignal ?? 0,
    }),
  );
};

export const overrideInstruction = ({
  instructions,
  wire,
  overrideValue,
}: {
  instructions: string[];
  wire: string;
  overrideValue: string;
}) => {
  const instructionIndex = instructions.findIndex((instrcution) =>
    instrcution.match(new RegExp(`^.+ -> ${wire}$`)),
  );

  if (instructionIndex === -1) {
    throw new Error(`Wire ${wire} not found in instructions`);
  }

  const instructionsCopy = [...instructions];
  instructionsCopy[instructionIndex] = `${overrideValue} -> ${wire}`;
  return instructionsCopy;
};
