import { countConsecutively } from './utils/index';

export const computeLookAndSay = ({ inputs }: { inputs: string[] }) => {
  const sequences: string[] = [];
  let index = 0;

  inputs.forEach((_) => {
    const currentInput = inputs[index];

    if (currentInput === undefined) {
      return;
    }

    const numberOfCurrentInput = countConsecutively({
      inputs,
      searchedItem: currentInput,
      startIndex: index,
    });

    if (numberOfCurrentInput > 0) {
      sequences.push(numberOfCurrentInput.toString(), currentInput);
    }

    index += numberOfCurrentInput;
  });

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
