function filltheArray(a, b) {
  const array = [];
  array.push(a);

  for (let i = a + 1; i < b; i++) {
    array.push(i);
  }

  array.push(b);
  return array;
}

module.exports = filltheArray;