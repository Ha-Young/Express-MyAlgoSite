function *fibonacci() {
  let currentNum = 1;
  let prevNum = 1;
  let temp = 0;

  yield 1;
  yield 1;

  while (true) {
    yield currentNum + prevNum;
    temp = prevNum;
    prevNum = currentNum;
    currentNum = currentNum + temp;
  }
}

function solution(n) {
  // Your code...
  const iter = fibonacci();

	let result = 0;
	for (let i = 0; i < n; i++) {
  	result = iter.next().value;
	}

  return result;
}
