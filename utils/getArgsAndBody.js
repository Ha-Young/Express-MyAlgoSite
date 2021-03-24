const getArgsAndBody = (func) => {
  const funcStr = func.toString();

  const trimmedFuncStr = funcStr.replace(/\n|\r| /g, "");
  const reOfArgsBracket = /\([^\)]*\)/;
  const reOfBodyBracket = /\{.*\}/;

  const argsBracket = trimmedFuncStr.match(reOfArgsBracket)[0];
  const bodyBracket = trimmedFuncStr.match(reOfBodyBracket)[0];

  const args = argsBracket.slice(1, -1).split(",");
  const body = bodyBracket.slice(1, -1);

  return { args, body };
};

module.exports = getArgsAndBody;
