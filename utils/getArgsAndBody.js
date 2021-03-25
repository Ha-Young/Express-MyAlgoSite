const getArgsAndBody = (func) => {
  const funcStr = func.toString();

  const startArgIdx = funcStr.indexOf("(");
  const endArgIdx = funcStr.indexOf(")");
  const funcArgs = funcStr.slice(startArgIdx + 1, endArgIdx).split(",");

  const startBodyIdx = funcStr.indexOf("{");
  const endBodyIdx = funcStr.lastIndexOf("}");
  const funcBody = funcStr.slice(startBodyIdx, endBodyIdx + 1);

  return { funcArgs, funcBody };
};

module.exports = getArgsAndBody;
