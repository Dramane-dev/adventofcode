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
    remainingInstructions = remainingInstructions.filter((instruction) => {
      // parsing instruction step ✅
      const parsedInstruction = parseInstruction(instruction);

      // check if it's possible to apply instruction ✅
      if (hasSignalValue({ wiresWithSignals, parsedInstruction })) {
        // apply instruction ✅
        applyInstruction({ wiresWithSignals, parsedInstruction });

        // do not keep exectuted instruction ✅
        return false;
      }

      /**
       * keep instruction because cannot be exectuted now beacause it's block
       * by another deps (wire not completed)
       */
      return true;
    });
  }

  // use a while (remainingInstructions.length) {} to pass until remainingInstructions was empty ✅
  return wiresWithSignals.get('a');
};
