

const dummy = [
  {
    title: "피보나치 수열",
    description: "피보나치 수는 F(0) = 0, F(1) = 1일 때, 1 이상의 n에 대하여 F(n) = F(n-1) + F(n-2) 가 적용되는 수 입니다.",
    difficuty_level: 1,
    author: "abc",
    tags: ["brutalForce", "recursion"],
    testCases: [
      { testcase: [1,2,3,4,5], answer: 15 },
      { testcase: [1,2,3,4,5,6], answer: 21 },
      { testcase: [1,2,3,4,5,6,7,8,9,10], answer: 55 }
    ],
    like: [],
    accuracy: {
      accuracy: 0,
      challengers_count: 0,
      challengers: []
    }
  },
  {
    title: "서울에서 김서방 찾기",
    description: "String형 배열 seoul의 element중 Kim의 위치 x를 찾아, 김서방은 x에 있다는 String을 반환하는 함수, solution을 완성하세요. seoul에 Kim은 오직 한 번만 나타나며 잘못된 값이 입력되는 경우는 없습니다.",
    difficulty_level: 2,
    author: "bbbbbbb",
    tags: ["string", "search"],
    testCases: [
      { testcase: ["kim", "lee", "woo"], answer: "김서방은 0에 있다" },
      { testcase: ["woo", "lee", "kim"], answer: "김서방은 2에 있다" },
    ],
    like: [],
    accuracy: {
      accuracy: 0,
      challengers_count: 0,
      challengers: []
    }
  },
  {
    title: "수박수박수박수박수",
    difficulty_level: 2,
    description: "길이가 n이고, 수박수박수박수....와 같은 패턴을 유지하는 문자열을 리턴하는 함수, solution을 완성하세요. 예를들어 n이 4이면 수박수박을 리턴하고 3이라면 수박수를 리턴하면 됩니다.\n제한 조건\nn은 길이 10,000이하인 자연수입니다.",
    author: "cccccc",
    tags: ["string"],
    testCases: [
      { testcase: 3, answer: "수박수" },
      { testcase: 4, answer: "수박수박" },
    ],
    like: [],
    accuracy: {
      accuracy: 0,
      challengers_count: 0,
      challengers: []
    }
  },
  {
    title: "하샤드 수",
    difficulty_level: 3,
    description: "양의 정수 x가 하샤드 수이려면 x의 자릿수의 합으로 x가 나누어져야 합니다. 예를 들어 18의 자릿수 합은 1+8=9이고, 18은 9로 나누어 떨어지므로 18은 하샤드 수입니다. 자연수 n을 입력받아 n이 하샤드 수인지 아닌지 검사하는 함수, solution을 완성해주세요.",
    author: "ddddd",
    tags: ["hashad"],
    testCases: [
      { testcase: 10, answer: true },
      { testcase: 11, answer: false },
    ],
    like: [],
    accuracy: {
      accuracy: 0,
      challengers_count: 0,
      challengers: []
    }
  }
];

module.exports = dummy;
