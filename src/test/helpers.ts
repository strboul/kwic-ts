/** Helper function to get range text
 */
const getRangeText = (
  text: string,
  ranges: any,
  i: number,
  elem: string,
  j: number | null = null,
) => {
  let arr: [number, number];
  if (j === null) {
    arr = ranges[i][elem] as [number, number];
  } else {
    arr = ranges[i][elem][j] as [number, number];
  }
  const out: string = text.substring(...arr);
  return out;
};

export { getRangeText };
