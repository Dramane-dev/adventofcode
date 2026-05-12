import { countConsecutively } from './utils/index';

export const computeLookAndSay = ({ inputs }: { inputs: string[] }) => {
  const sequences: string[] = [];

  for (let index = 0; index <= inputs.length; ) {
    const currentInput = inputs.length > 1 ? inputs[index] : inputs[0];
    const numberOfCurrentInput = countConsecutively({
      inputs,
      searchedItem: currentInput,
    });

    if (numberOfCurrentInput > 0) {
      sequences.push(numberOfCurrentInput.toString(), currentInput);
    }

    const isRemainingConsecutiveInputs = inputs.every((input) => input === currentInput);

    if (isRemainingConsecutiveInputs) {
      return sequences;
    }

    if (numberOfCurrentInput > 0) {
      index = 0;
    } else {
      index++;
    }

    inputs = inputs.slice(numberOfCurrentInput);
  }

  return sequences;
};

export const applyLookAndSaySequences = ({
  input,
  repeat = 1,
}: {
  input: string;
  repeat?: number;
}) => {
  let inputs = input.split('');

  if (inputs.length === 0) {
    return '';
  }

  if (inputs.length === 1) {
    return ['1', inputs[0]].length;
  }

  for (let i = 0; i < repeat; i++) {
    const sequences = computeLookAndSay({ inputs });
    inputs = sequences;
  }

  return inputs.length;
};
