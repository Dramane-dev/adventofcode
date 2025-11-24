import { BitwiseOperatorsType, ParsedInstructionType } from './index.type';
import {
  isLogicalOperator,
  isNumeric,
  isRorLShiftOperator,
  mapBitwiseOperatorToOperationFunction,
  parseInstruction,
} from './utils';

export const prepareWireInstructions = (instructions: string[]) => {
  const wireInstructions = new Map<string, string>([]);

  for (const instruction of instructions) {
    const { targetWireName } = parseInstruction(instruction);

    wireInstructions.set(targetWireName, instruction);
  }

  return wireInstructions;
};

export const getSecondSignal = ({
  operator,
  wires,
  shiftedValue,
  getWireSignalValue,
}: {
  operator: BitwiseOperatorsType;
  wires: ParsedInstructionType['wires'];
  shiftedValue: ParsedInstructionType['shiftedValue'];
  getWireSignalValue: (wire: string) => number;
}) => {
  if (isLogicalOperator(operator)) {
    return getWireSignalValue(wires[1]);
  }

  if (isRorLShiftOperator(operator) && shiftedValue) {
    return shiftedValue;
  }

  return 0;
};

export const findSpecificWireSignalRecursively = ({
  inputs,
  wireToSearch,
}: {
  inputs: string[];
  wireToSearch: string;
}) => {
  const wireInstructions = prepareWireInstructions(inputs);
  const wiresWithSignalsCache = new Map<string, number>([]);

  const getWireSignalValue = (wire: string): number => {
    if (isNumeric(wire)) {
      return Number(wire);
    }

    const cached = wiresWithSignalsCache.get(wire);

    if (cached !== undefined) {
      return cached;
    }

    const instruction = wireInstructions.get(wire);

    // wire not found...
    if (instruction === undefined) {
      return 0;
    }

    const { operator, wires, shiftedValue } = parseInstruction(instruction);

    if (!operator) {
      const signalValue = getWireSignalValue(wires[0]);
      wiresWithSignalsCache.set(wire, signalValue);

      return signalValue;
    }

    const firstSignal = getWireSignalValue(wires[0]);
    const secondSignal = getSecondSignal({ operator, wires, shiftedValue, getWireSignalValue });
    const wireValue = mapBitwiseOperatorToOperationFunction({
      operator,
      firstSignal,
      secondSignal,
    });
    wiresWithSignalsCache.set(wire, wireValue);

    return wireValue;
  };

  return getWireSignalValue(wireToSearch);
};
