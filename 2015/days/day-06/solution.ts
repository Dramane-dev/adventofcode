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

enum InstructionEnum {
  TURN_ON = 'turn on',
  TURN_OFF = 'turn off',
  TOGGLE = 'toggle',
}

const MAX_LIGHTS_CORNER = 999;
const CORNERS_SEPARATOR = ' through ';

const getInstruction = (input: string) => {
  const extractedInstruction = new RegExp(/(?:turn on|turn off|toggle)/, 'i').exec(input) || [];

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
    throw new Error('An error occured when trying to getCornerCoordinates');
  }

  const [startCorner, endCorner] = extractedCorners;
  const startCoordinates = startCorner.split(',');
  const endCoordinates = endCorner.split(',');

  return {
    startCorner: parseCoordinate(startCoordinates),
    endCorner: parseCoordinate(endCoordinates),
  };
};

const initializeLightsGrid = () => {
  const lightsGrid: boolean[][] = [];

  for (let i = 0; i <= MAX_LIGHTS_CORNER; i++) {
    lightsGrid[i] = [];
    for (let j = 0; j <= MAX_LIGHTS_CORNER; j++) {
      lightsGrid[i][j] = false;
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

const applyInstructionToLightsGrid = ({
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

const countLitLights = (lightsGrid: boolean[][]) => {
  return lightsGrid.flat().filter((light) => light).length;
};

export const findHowManyLightsAreLit = (inputs: string[]) => {
  const lightsGrid = initializeLightsGrid();

  for (const input of inputs) {
    const {
      instruction,
      corners: { startCorner, endCorner },
    } = parseInstruction(input);

    for (let x = startCorner.x; x <= endCorner.x; x++) {
      for (let y = startCorner.y; y <= endCorner.y; y++) {
        applyInstructionToLightsGrid({
          instruction,
          coordinate: {
            x,
            y,
          },
          lightsGrid: lightsGrid,
        });
      }
    }
  }

  return countLitLights(lightsGrid);
};
