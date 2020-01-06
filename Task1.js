function partCalculator(arr) {
  const sum = arr.reduce((acc, el) => acc + parseFloat(el), 0);
  return arr.map(
    el => Math.round(((parseFloat(el) * 100) / sum) * 1000) / 1000
  );
}
