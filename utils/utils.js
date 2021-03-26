module.exports.getArrayParamString = function getArrayParamString(array) {
  let param = "[";
  array.forEach((el, i) => {
    i === array.length
      ? param += (changeWordFormat(el))
      : param += (changeWordFormat(el) + ",");
  });

  param += "]";
  return param;
}

function changeWordFormat(el) {
  if (typeof el === "string") return `"${el}"`;

  return el;
}

module.exports.getObjectParamString = function getObjectParamString(object) {
  const param = "{";
  for (let key in object) {
    param.concat(`\n ${key} : ${object[key]}`);
  }

  param.concat("}");
  return param;
}
