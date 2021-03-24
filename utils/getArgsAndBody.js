const getArgsAndBody = (func) => {
  const funcStr = func.toString();

  const startArgIdx = funcStr.indexOf("(");
  const endArgIdx = funcStr.indexOf(")");
  const functionArgs = funcStr.slice(startArgIdx + 1, endArgIdx).split(",");

  const startBodyIdx = funcStr.indexOf("{");
  const endBodyIdx = funcStr.lastIndexOf("}");
  const functionBody = funcStr.slice(startBodyIdx, endBodyIdx + 1);

  return { functionArgs, functionBody };
};

module.exports = getArgsAndBody;
