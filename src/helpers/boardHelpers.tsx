export const findNearestMineDistance = (userPosition: number, minesArray: number[]) => {
  return Math.min(
    ...minesArray
      .filter((minePosition) => minePosition !== userPosition)
      .map((minePosition) => calculateDistance(userPosition, minePosition))
  );
};

export const calculateDistance = (index1: number, index2: number) => {
  const row1 = Math.floor(index1 / 20);
  const col1 = index1 % 20;
  const row2 = Math.floor(index2 / 20);
  const col2 = index2 % 20;

  return Math.abs(row2 - row1) + Math.abs(col2 - col1);
};