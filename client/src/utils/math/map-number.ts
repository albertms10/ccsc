// Gist: https://gist.github.com/marcschneider/6991761

interface MapNumbersOptions {
  inMin?: number;
  inMax?: number;
  outMin?: number;
  outMax?: number;
}

/**
 * Re-maps a number from one range to another (default from 0 to 1).
 */
export default (
  value: number,
  { inMin = 0, inMax = 1, outMin = 0, outMax = 1 }: MapNumbersOptions
): number => ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
