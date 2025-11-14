type InstructionType = 'turn on' | 'turn off' | 'toggle';
type CoordinateType = {
  x: number;
  y: number;
};
type CornerCoordinateType = {
  startCorner: CoordinateType;
  endCorner: CoordinateType;
};
type ParsedInstructionType = {
  instruction: InstructionType;
  corners: CornerCoordinateType;
};
type ApplyInstructionFnType<T> = (params: {
  instruction: InstructionType;
  coordinate: CoordinateType;
  lightsGrid: T[][];
}) => void;

enum InstructionEnum {
  TURN_ON = 'turn on',
  TURN_OFF = 'turn off',
  TOGGLE = 'toggle',
}

const MAX_LIGHTS_CORNER = 999;
const CORNERS_SEPARATOR = ' through ';

const INSTRUCTION_REGEX = new RegExp(/(?:turn on|turn off|toggle)/, 'i');

const getInstruction = (input: string) => {
  const extractedInstruction = INSTRUCTION_REGEX.exec(input) || [];

  if (extractedInstruction.length && extractedInstruction[0]) {
    return extractedInstruction[0] as InstructionType;
  }

  return InstructionEnum.TURN_OFF;
};

const parseCoordinate = (coordinate: string[]): CoordinateType => {
  return {
    x: parseInt(coordinate[0], 10),
    y: parseInt(coordinate[1], 10),
  };
};

const getCornerCoordinates = (extractedCorners: string[]): CornerCoordinateType => {
  if (!extractedCorners || !extractedCorners.length) {
    throw new Error('An error occurred when trying to getCornerCoordinates');
  }

  const [startCorner, endCorner] = extractedCorners;
  const startCoordinates = startCorner.split(',');
  const endCoordinates = endCorner.split(',');

  return {
    startCorner: parseCoordinate(startCoordinates),
    endCorner: parseCoordinate(endCoordinates),
  };
};

const initializeLightsGrid = <T>(value: T) => {
  const lightsGrid: T[][] = [];

  for (let i = 0; i <= MAX_LIGHTS_CORNER; i++) {
    lightsGrid[i] = [];
    for (let j = 0; j <= MAX_LIGHTS_CORNER; j++) {
      lightsGrid[i][j] = value;
    }
  }

  return lightsGrid;
};

const parseInstruction = (input: string): ParsedInstructionType => {
  const instruction = getInstruction(input);
  const extractedCorners = input.replace(instruction, '').split(CORNERS_SEPARATOR);
  const cornersCoordinates = getCornerCoordinates(extractedCorners);

  return {
    instruction,
    corners: cornersCoordinates,
  };
};

const applyBooleanInstructionToLightsGrid = ({
  instruction,
  coordinate: { x, y },
  lightsGrid,
}: {
  instruction: InstructionType;
  coordinate: CoordinateType;
  lightsGrid: boolean[][];
}) => {
  if (instruction === InstructionEnum.TURN_ON) {
    lightsGrid[x][y] = true;
  }

  if (instruction === InstructionEnum.TURN_OFF) {
    lightsGrid[x][y] = false;
  }

  if (instruction === InstructionEnum.TOGGLE) {
    lightsGrid[x][y] = !lightsGrid[x][y];
  }
};

const applyBrightnessInstructionToLightsGrid = ({
  instruction,
  coordinate: { x, y },
  lightsGrid,
}: {
  instruction: InstructionType;
  coordinate: CoordinateType;
  lightsGrid: number[][];
}) => {
  if (instruction === InstructionEnum.TURN_ON) {
    lightsGrid[x][y] += 1;
  }

  /**
   * check lightsGrid[x][y] > 0 to avoid negative number in grid
   * brightness cannot go below 0
   */
  if (instruction === InstructionEnum.TURN_OFF && lightsGrid[x][y] > 0) {
    lightsGrid[x][y] -= 1;
  }

  if (instruction === InstructionEnum.TOGGLE) {
    lightsGrid[x][y] += 2;
  }
};

const processInstructions = <T>({
  inputs,
  lightsGrid,
  applyInstructionFn,
}: {
  inputs: string[];
  lightsGrid: T[][];
  applyInstructionFn: ApplyInstructionFnType<T>;
}) => {
  for (const input of inputs) {
    const {
      instruction,
      corners: { startCorner, endCorner },
    } = parseInstruction(input);

    for (let x = startCorner.x; x <= endCorner.x; x++) {
      for (let y = startCorner.y; y <= endCorner.y; y++) {
        applyInstructionFn({
          instruction,
          coordinate: {
            x,
            y,
          },
          lightsGrid,
        });
      }
    }
  }
};

const countLitLights = (lightsGrid: boolean[][]) => {
  return lightsGrid.flat().filter((light) => light).length;
};

const sumOfBrightnessLights = (lightsGrid: number[][]) => {
  return lightsGrid.flat().reduce((acc, curr) => acc + curr, 0);
};

export const findHowManyLightsAreLit = (inputs: string[]) => {
  const lightsGrid = initializeLightsGrid<boolean>(false);

  processInstructions({
    inputs,
    lightsGrid,
    applyInstructionFn: applyBooleanInstructionToLightsGrid,
  });

  return countLitLights(lightsGrid);
};

export const findTotalBrightness = (inputs: string[]) => {
  const lightsGrid = initializeLightsGrid<number>(0);

  processInstructions({
    inputs,
    lightsGrid,
    applyInstructionFn: applyBrightnessInstructionToLightsGrid,
  });

  return sumOfBrightnessLights(lightsGrid);
};
