import { assertIsValidInputSize, cleanInput, parseInputToNumber, sortInput } from './utils';

type DimensionType = {
  length: number;
  width: number;
  height: number;
};

const buildDimensionsObject = (dimensions: number[]): DimensionType => {
  return {
    length: dimensions[0],
    width: dimensions[1],
    height: dimensions[2],
  };
};

const getSideAreas = ({ length, width, height }: DimensionType) => {
  return [length * width, width * height, height * length];
};

const getSmallestSideArea = (dimensions: number[]) => {
  return Math.min(...dimensions);
};

// formula: (2 x length x width) + (2 x width x height) + (2 x height x length)
const applySurfaceAreaFormula = (computedDimentions: number[]) => {
  return computedDimentions
    .map((dimensions) => 2 * dimensions)
    .reduce((prev, curr) => prev + curr, 0);
};

const computeSurfaceArea = ({ length, width, height }: DimensionType) => {
  const sideAreas = getSideAreas({ length, width, height });
  const smallestSideArea = getSmallestSideArea(sideAreas);
  const surfaceArea = applySurfaceAreaFormula(sideAreas);

  return surfaceArea + smallestSideArea;
};

export const getWrappingPaperSurfaceArea = (input: string[]) => {
  let surfaceArea = 0;

  for (const dimensions of input) {
    assertIsValidInputSize(dimensions);

    const cleanedDimensions = cleanInput(dimensions);
    const dimensionsDetail = buildDimensionsObject(cleanedDimensions);
    const computedAreaSurface = computeSurfaceArea(dimensionsDetail);
    surfaceArea += computedAreaSurface;
  }

  return surfaceArea;
};

const getSmallestPresentSides = (dimensions: number[]) => {
  return [dimensions[0], dimensions[1]];
};

/**
 * formula: 2a + 2b
 * dimensions: 2(a) x 3(b) => 2 + 2 + 3 + 3 = 2 x (2 + 3)
 */
const computerequiredRebbon = (dimensions: number[]) => {
  return 2 * (dimensions[0] + dimensions[1]);
};

/**
 * formula: a + b + c
 * dimensions: 2(a) x 3(b) x 4(c) => 2 * 3 * 4
 */
const computerequiredBowRebbon = (dimensions: number[]) => {
  return dimensions[0] * dimensions[1] * dimensions[2];
};

export const getRequiredRebbonToWrapPresents = (input: string[]) => {
  let requiredRebbon = 0;

  for (const dimensions of input) {
    assertIsValidInputSize(dimensions);

    const cleanedDimensions = cleanInput(dimensions);
    const sortedDimensions = sortInput(cleanedDimensions);
    const smallestPresentSides = getSmallestPresentSides(sortedDimensions);
    const computedRequiredReboon = computerequiredRebbon(smallestPresentSides);
    const computedRequiredBowRebbon = computerequiredBowRebbon(cleanedDimensions);
    requiredRebbon += computedRequiredReboon + computedRequiredBowRebbon;
  }

  return requiredRebbon;
};
