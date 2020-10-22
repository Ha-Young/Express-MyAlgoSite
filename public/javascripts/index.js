/* CodeMirror 3.14.2 .....*/
let codemirror = new CodeMirror.fromTextArea(document.getElementById("codemirror"), {
  mode: "javascript",
  lineNumbers: true,
  lineWrapping: true,
  tabSize: 2,
  theme: "material-darker",
});


function helloWorld(e) {

return e;
}

const fnName = "helloWorld";
const params = "ctrlq.org";

const a = window[fnName](params);


function hackerAll(a, b) {
  var result = a * b;
  return result;
}

const fn_string = hackerAll.toString();
const back_to_fn = new Function(`return ${fn_string}`)() //This restore the function with name, params and all, even es7 class works

let string = 'hackerAll(1, 3)';

let result = new Function(`return ${string}`);

console.log('result', result());

// console.log('fn as it', hackerAll);
// console.log('fn string', fn_string);
// console.log('restored fn', back_to_fn);

const name = back_to_fn.name;
// console.log(window[name]('1','2'));

