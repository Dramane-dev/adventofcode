import { ParsedInstructionType, WiresWithSignalsType } from './index.type';
import {
  applyDirectAssignmentInstruction,
  applyOperatorInstruction,
  isNumeric,
  parseInstruction,
} from './utils';

export const hasSignalValue = ({
  wiresWithSignals,
  parsedInstruction,
}: {
  wiresWithSignals: WiresWithSignalsType;
  parsedInstruction: ParsedInstructionType;
}) => {
  return parsedInstruction.wires.every((wire) => isNumeric(wire) || wiresWithSignals.has(wire));
};

export const applyInstruction = ({
  wiresWithSignals,
  parsedInstruction,
}: {
  wiresWithSignals: WiresWithSignalsType;
  parsedInstruction: ParsedInstructionType;
}) => {
  if (!parsedInstruction.operator) {
    return applyDirectAssignmentInstruction({ wiresWithSignals, parsedInstruction });
  }

  return applyOperatorInstruction({ wiresWithSignals, parsedInstruction });
};

export const findSpecificWireSignal = (inputs: string[]) => {
  const instructions = inputs;
  const wiresWithSignals = new Map<string, number>([]);
  let remainingInstructions = [...instructions];

  while (remainingInstructions.length) {
    const remainingInstructionsLengthBefore = remainingInstructions.length;

    remainingInstructions = remainingInstructions.filter((instruction) => {
      const parsedInstruction = parseInstruction(instruction);

      if (hasSignalValue({ wiresWithSignals, parsedInstruction })) {
        applyInstruction({ wiresWithSignals, parsedInstruction });

        // do not keep exectuted instruction
        return false;
      }

      /**
       * keep instruction because cannot be exectuted now beacause it's block
       * by another deps (wire not completed)
       */
      return true;
    });

    const remainingInstructionsLengthAfter = remainingInstructions.length;

    if (remainingInstructionsLengthBefore === remainingInstructionsLengthAfter) {
      break;
    }
  }

  return wiresWithSignals.get('a');
};
