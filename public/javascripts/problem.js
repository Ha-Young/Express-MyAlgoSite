const testNumber = document.querySelector('.testNumber').textContent.replace(/문제번호:/g, "").trim();
const submitButton = document.querySelector('.submitButton');

let cm = new CodeMirror.fromTextArea(document.getElementById("editor"), {
  value: "function sdfs() {}",
  lineNumbers: true, 
  mode: "javascript", 
  theme: "dracula",
  lineWrapping: true,
  
});
cm.setSize(1000,450);


// console.log(submitButton)
// console.log(testNumber);
// submitButton.addEventListener('click', () => {
//   const ss = cm.getDoc().getValue();
//   console.log(ss)
// });


 // cm.getDoc().setValue('zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz');
// cm.markText({line:0,ch:0},{line:3,ch:0}, {css: 'font-size:20pt'});