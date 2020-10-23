function solution (n) {
  if (n <= 1) {
    return n;
  }

  return solution(n - 1) + solution(n - 2);
}

function solution (seoul) {
  let kimPosition = seoul.indexOf('Kim');

  return `김서방은 ${kimPosition}에 있다`;
}

function solution (n) {
  if (n > 10000) {
    return undefined;
  }

  return '수박'.repeat(n/2) + (n % 2 === 1 ? '수' : '');
}

function solution (x){
  return !(x % (x + '').split('').reduce((a, b) => +b + +a ));
}