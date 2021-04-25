/** Sequence generation
 *
 * @param from the starting value of the sequence
 * @param to the ending value of the sequence
 */
const seq = (from: number, to: number): number[] => {
  const len = Math.abs(to - from) + 1;
  const res = Array.from({ length: len }, (_, i) => {
    return from < to ? i + from : from - i;
  });
  return res;
};

export { seq };
