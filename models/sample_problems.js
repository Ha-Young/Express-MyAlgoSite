module.exports = [
  // {
  //   id: 1,
  //   title: "피보나치 수열",
  //   completed_users: 15,
  //   difficulty_level: 1,
  //   argument: "n",
  //   description:
  //     "피보나치 수는 F(0) = 0, F(1) = 1일 때, 1 이상의 n에 대하여 F(n) = F(n-1) + F(n-2) 가 적용되는 수 입니다.",
  //   tests: [
  //     {
  //       code: "solution(3)",
  //       output: "2",
  //       solution: 2,
  //     },
  //     {
  //       code: "solution(2)",
  //       output: "1",
  //       solution: 1,
  //     },
  //     {
  //       code: "solution(1)",
  //       output: "1",
  //       solution: 1,
  //     },
  //   ],
  // },
  // {
  //   id: 2,
  //   title: "서울에서 김서방 찾기",
  //   completed_users: 11,
  //   difficulty_level: 2,
  //   argument: "array",
  //   description:
  //     "String형 배열 seoul의 element중 Kim의 위치 x를 찾아, 김서방은 x에 있다는 String을 반환하는 함수, solution을 완성하세요. seoul에 Kim은 오직 한 번만 나타나며 잘못된 값이 입력되는 경우는 없습니다.",
  //   tests: [
  //     {
  //       code: "solution(['Jane', 'Kim'])",
  //       output: "김서방은 1에 있다",
  //       solution: "김서방은 1에 있다",
  //     },
  //     {
  //       code: "solution(['Jane', 'Huh', 'Kim'])",
  //       output: "김서방은 2에 있다",
  //       solution: "김서방은 2에 있다",
  //     },
  //   ],
  // },
  // {
  //   id: 3,
  //   title: "수박수박수박수박수",
  //   completed_users: 12,
  //   difficulty_level: 2,
  //   argument: "n",
  //   description:
  //     "길이가 n이고, 수박수박수박수....와 같은 패턴을 유지하는 문자열을 리턴하는 함수, solution을 완성하세요. 예를들어 n이 4이면 수박수박을 리턴하고 3이라면 수박수를 리턴하면 됩니다.\n제한 조건\nn은 길이 10,000이하인 자연수입니다.",
  //   tests: [
  //     {
  //       code: "solution(3)",
  //       output: "수박수",
  //       solution: "수박수",
  //     },
  //     {
  //       code: "solution(4)",
  //       output: "수박수박",
  //       solution: "수박수박",
  //     },
  //   ],
  // },
  // {
  //   id: 4,
  //   title: "하샤드 수",
  //   solution_count: 5,
  //   difficulty_level: 3,
  //   argument: "n",
  //   description:
  //     "양의 정수 x가 하샤드 수이려면 x의 자릿수의 합으로 x가 나누어져야 합니다. 예를 들어 18의 자릿수 합은 1+8=9이고, 18은 9로 나누어 떨어지므로 18은 하샤드 수입니다. 자연수 n을 입력받아 n이 하샤드 수인지 아닌지 검사하는 함수, solution을 완성해주세요.",
  //   tests: [
  //     {
  //       code: "solution(10)",
  //       output: "true",
  //       solution: true,
  //     },
  //     {
  //       code: "solution(11)",
  //       output: "false",
  //       solution: false,
  //     },
  //   ],
  // },
  // {
  //   id: 5,
  //   title: "Reverse Integer",
  //   completed_users: 15,
  //   difficulty_level: 1,
  //   argument: "n",
  //   description:
  //     "Given a signed 32-bit integer x, return x with its digits reversed. If reversing x causes the value to go outside the signed 32-bit integer range [-231, 231 - 1], then return 0.",
  //   tests: [
  //     {
  //       code: "solution(123)",
  //       output: "321",
  //       solution: 321,
  //     },
  //     {
  //       code: "solution(-123)",
  //       output: "-321",
  //       solution: -321,
  //     },
  //     {
  //       code: "solution(120)",
  //       output: "21",
  //       solution: 21,
  //     },
  //   ],
  // },
  // {
  //   id: 6,
  //   title: "Palindrome Integer",
  //   completed_users: 15,
  //   difficulty_level: 2,
  //   argument: "n",
  //   description:
  //     "An integer is a palindrome when it reads the same backward as forward. For example, 121 is palindrome while 123 is not.",
  //   tests: [
  //     {
  //       code: "solution(121)",
  //       output: "true",
  //       solution: true,
  //     },
  //     {
  //       code: "solution(-121)",
  //       output: "false",
  //       solution: false,
  //     },
  //     {
  //       code: "solution(10)",
  //       output: "false",
  //       solution: false,
  //     },
  //   ],
  // },
  // {
  //   id: 6,
  //   title: "3Sum",
  //   completed_users: 15,
  //   difficulty_level: 4,
  //   argument: "nums",
  //   description:
  //     "Given an array nums of n integers, are there elements a, b, c in nums such that a + b + c = 0? Find all unique triplets in the array which gives the sum of zero. Notice that the solution set must not contain duplicate triplets.",
  //   tests: [
  //     {
  //       code: "solution([-1, 0, 1, 2, -1, -4])",
  //       output: "[[-1, -1, 2],[-1, 0, 1]]",
  //       solution: [
  //         [-1, -1, 2],
  //         [-1, 0, 1],
  //       ],
  //     },
  //     {
  //       code: "solution([])",
  //       output: "[]",
  //       solution: [],
  //     },
  //     {
  //       code: "solution([0])",
  //       output: "[]",
  //       solution: [],
  //     },
  //   ],
  // },
  // {
  //   id: 7,
  //   title: "Longest Palindromic Substring",
  //   completed_users: 15,
  //   difficulty_level: 4,
  //   argument: "s",
  //   description:
  //     "Given a string s, return the longest palindromic substring in s.",
  //   tests: [
  //     {
  //       code: "solution('babad')",
  //       output: "bab",
  //       solution: "bab",
  //     },
  //     {
  //       code: "solution('cbbd')",
  //       output: "bb",
  //       solution: "bb",
  //     },
  //     {
  //       code: "solution('a')",
  //       output: "a",
  //       solution: "a",
  //     },
  //   ],
  // },
  {
    id: 8,
    title: "Word Break",
    completed_users: 15,
    difficulty_level: 4,
    argument: "s, wordDict",
    description:
      "Given a string s and a dictionary of strings wordDict, return true if s can be segmented into a space-separated sequence of one or more dictionary words.",
    tests: [
      {
        code: "solution('leetcode', ['leet', 'code'])",
        output: "true",
        solution: true,
      },
      {
        code: "solution('applepenapple', ['apple', 'pen'])",
        output: "true",
        solution: true,
      },
      {
        code: "solution('catsanddog', ['cats', 'dog', 'sand', 'and', 'cat'])",
        output: "false",
        solution: false,
      },
    ],
  },
  {
    id: 8,
    title: "Largest Number",
    completed_users: 15,
    difficulty_level: 3,
    argument: "nums",
    description:
      "Given a list of non-negative integers nums, arrange them such that they form the largest number.",
    tests: [
      {
        code: "solution([10, 2])",
        output: "210",
        solution: "210",
      },
      {
        code: "solution([3, 30, 34, 5, 9])",
        output: "9534330",
        solution: "9534330",
      },
      {
        code: "solution([10])",
        output: "10",
        solution: "10",
      },
    ],
  },
  {
    id: 8,
    title: "Find Element In Rotated List",
    completed_users: 15,
    difficulty_level: 3,
    argument: "nums",
    description:
      "Find target element in rotated list. Try to get the best time complexity.",
    tests: [
      {
        code: "solution([3, 4, 5, 6, 7, 8, 1, 2], 2)",
        output: "7",
        solution: 7,
      },
      {
        code: "solution([3, 4, 5, 6, 7, 8, 1, 2], 6)",
        output: "3",
        solution: 3,
      },
      {
        code: "solution([10])",
        output: "10",
        solution: "10",
      },
    ],
  },
];
