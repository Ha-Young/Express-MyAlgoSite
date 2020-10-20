// const MongoClient = require('mongodb').MongoClient;
// const url = 'mongodb://localhost:27017';

const db = require('./db');
const Problem = require('./models/Problem');

const problems = [
  {
    "id": 1,
    "title": "피보나치 수열",
    "completed_users": 15,
    "difficulty_level": 1,
    "description": "피보나치 수는 F(0) = 0, F(1) = 1일 때, 1 이상의 n에 대하여 F(n) = F(n-1) + F(n-2) 가 적용되는 수 입니다.",
    "tests": [
      {
        "code": "solution(3)",
        "solution": 2
      },
      {
        "code": "solution(2)",
        "solution": 1
      },
      {
        "code": "solution(1)",
        "solution": 1
      }
    ]
  },
  {
    "id": 2,
    "title": "서울에서 김서방 찾기",
    "completed_users": 11,
    "difficulty_level": 2,
    "description": "String형 배열 seoul의 element중 Kim의 위치 x를 찾아, 김서방은 x에 있다는 String을 반환하는 함수, solution을 완성하세요. seoul에 Kim은 오직 한 번만 나타나며 잘못된 값이 입력되는 경우는 없습니다.",
    "tests": [
      {
        "code": "solution(['Jane', 'Kim'])",
        "solution": "김서방은 1에 있다"
      },
      {
        "code": "solution(['Jane', 'Huh', 'Kim'])",
        "solution": "김서방은 2에 있다"
      }
    ]
  },
  {
    "id": 3,
    "title": "수박수박수박수박수",
    "completed_users": 12,
    "difficulty_level": 2,
    "description": "길이가 n이고, 수박수박수박수....와 같은 패턴을 유지하는 문자열을 리턴하는 함수, solution을 완성하세요. 예를들어 n이 4이면 수박수박을 리턴하고 3이라면 수박수를 리턴하면 됩니다.\n제한 조건\nn은 길이 10,000이하인 자연수입니다.",
    "tests": [
      {
        "code": "solution(3)",
        "solution": "수박수"
      },
      {
        "code": "solution(4)",
        "solution": "수박수박"
      }
    ]
  },
  {
    "id": 4,
    "title": "하샤드 수",
    "completed_users": 10,
    "solution_count": 5,
    "difficulty_level": 3,
    "description": "양의 정수 x가 하샤드 수이려면 x의 자릿수의 합으로 x가 나누어져야 합니다. 예를 들어 18의 자릿수 합은 1+8=9이고, 18은 9로 나누어 떨어지므로 18은 하샤드 수입니다. 자연수 n을 입력받아 n이 하샤드 수인지 아닌지 검사하는 함수, solution을 완성해주세요.",
    "tests": [
      {
        "code": "solution(10)",
        "solution": true
      },
      {
        "code": "solution(11)",
        "solution": false
      }
    ]
  }
];

saveProblems();

async function saveProblems() {
  for (let i = 0; i < problems.length; i++) {
    await new Problem(problems[i]).save();
  }
}

// MongoClient.connect(url, (err, db) => {
//   if (err) throw err;

//   const dbo = db.db('codewars');

//   dbo.collection('problems').insertMany(problems, (err, res) => {
//     if (err) throw err;

//     console.log('Number inserted:' + res.insertedCount);

//     db.close();
//   });
// });
