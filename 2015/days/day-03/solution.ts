type DeliveredHousesType = Set<string>;

const DEFAULT_DELIVERED_HOUSE_POSITION = '0,0';

const buildDeliveredHousePositionObject = (deliveredHousePosition: string) => {
  const deliveredHousePositionSplited = deliveredHousePosition.split(',');
  return {
    x: parseInt(deliveredHousePositionSplited[0], 10),
    y: parseInt(deliveredHousePositionSplited[1], 10),
  };
};

const convertInstructionToHousePosition = ({
  instruction,
  currentPosition,
}: {
  instruction: string;
  currentPosition: {
    x: number;
    y: number;
  };
}) => {
  const isGoLeft = instruction === '<';
  const isGoRight = instruction === '>';
  const isGoUp = instruction === '^';
  const isGoDown = instruction === 'v';

  if (isGoLeft) {
    return `${currentPosition.x - 1},${currentPosition.y}`;
  }

  if (isGoRight) {
    return `${currentPosition.x + 1},${currentPosition.y}`;
  }

  if (isGoUp) {
    return `${currentPosition.x},${currentPosition.y + 1}`;
  }

  if (isGoDown) {
    return `${currentPosition.x},${currentPosition.y - 1}`;
  }

  return DEFAULT_DELIVERED_HOUSE_POSITION;
};

const checkIfHouseAlreadyReceivedSomePresent = ({
  deliveredHouses,
  houseToBeDeliveredPosition,
}: {
  deliveredHouses: DeliveredHousesType;
  houseToBeDeliveredPosition: string;
}) => {
  return deliveredHouses.has(houseToBeDeliveredPosition);
};

export const getHousesReceivedLeastOncePresent = ({
  instructions,
  deliveredHouses = new Set([DEFAULT_DELIVERED_HOUSE_POSITION]),
}: {
  instructions: string;
  deliveredHouses?: DeliveredHousesType;
}) => {
  let currentPosition = { x: 0, y: 0 };

  for (const instruction of instructions) {
    const houseToBeDeliveredPosition = convertInstructionToHousePosition({
      instruction,
      currentPosition,
    });
    currentPosition = buildDeliveredHousePositionObject(houseToBeDeliveredPosition);

    const isAlreadyDeliveredHouse = checkIfHouseAlreadyReceivedSomePresent({
      deliveredHouses,
      houseToBeDeliveredPosition,
    });

    if (isAlreadyDeliveredHouse) {
      continue;
    }

    deliveredHouses.add(houseToBeDeliveredPosition);
  }

  return deliveredHouses;
};

const shareInstructionsBeteweenSantaAndRobotSanta = (input: string) => {
  const santaInstructions = [];
  const robotSantaInstructions = [];
  let i = 0;

  for (const instruction of input) {
    const isEven = i % 2 === 0;

    if (isEven) {
      santaInstructions.push(instruction);
    } else {
      robotSantaInstructions.push(instruction);
    }

    i++;
  }

  return [santaInstructions.join(''), robotSantaInstructions.join('')];
};

export const getHousesReceivedLeastOncePresentWithRobotSanta = (input: string) => {
  const deliveredHouses: DeliveredHousesType = new Set([DEFAULT_DELIVERED_HOUSE_POSITION]);
  const [santaInstructions, robotSantaInstructions] =
    shareInstructionsBeteweenSantaAndRobotSanta(input);
  const santaDelivredHouses = getHousesReceivedLeastOncePresent({
    instructions: santaInstructions,
    deliveredHouses,
  });
  const robotSantaDeliveredHouses = getHousesReceivedLeastOncePresent({
    instructions: robotSantaInstructions,
    deliveredHouses: santaDelivredHouses,
  });

  return robotSantaDeliveredHouses.size;
};
