function functionalize(string) {
  return new Function(`return ${string}`)();

}

module.exports = functionalize;
