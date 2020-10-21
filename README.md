![Codewars](/codewars.png)

# Codewars

[Codewars](https://codewars.com)와 같이 등록되어 있는 알고리즘 문제를 풀 수 있는 어플리케이션입니다.

## Setup

```sh
yarn install or npm install
```

## Development

```sh
yarn run dev or npm run dev
```

## Project Structure

기본적인 과제 프로젝트 구성을 따르되, [Project Structure](https://www.freecodecamp.org/news/how-to-write-a-production-ready-node-and-express-app-f214f0b17d8c/)등 인터넷 자료 혹은 기존 과제의 구조를 참고하여 자유롭게 변경하셔도 됩니다.

## TODO

### 1. GET `/login`

  - [x] 로그인 버튼이 보여져야 합니다.
  - [x] 로그인에 성공하면 `/` 페이지로 이동해야 합니다.
  - [x] 로그인에 실패하면 `/login` 페이지로 다시 돌아와야 합니다.
  - [x] 로그인 하지 않은 사용자는 로그인 페이지 이외의 그 어떤 페이지도 방문할 수 없어야 합니다.
  - [x] 소셜 로그인이나 일반 가입 및 로그인 중 본인의 취향에 따라 선택하여 로그인 기능을 구현하세요. (Firebase 등 클라이언트 로그인 모듈은 사용하지 마세요.)

#### Resource
- [Passport Github](https://github.com/jaredhanson/passport-github)
- [Passport Example](https://github.com/passport/express-4.x-facebook-example/blob/master/server.js)
- [Authentication Flow](https://medium.com/createdd-notes/starting-with-authentication-a-tutorial-with-node-js-and-mongodb-25d524ca0359) (Research Hashing, Salting, Sessions, and Cookies)

### 2. GET `/`

  - [x] `/views/index.ejs` template을 보여주어야 합니다.
  - [x] 기존 템플릿에 있는 문제 정보를 지우고, `/models/sample_problems.json`의 정보를 기반으로 데이터베이스를 이용하여 페이지에 문제 정보를  보여주도록 수정해주세요. 문제 이름, 정답자 수, 문제 레벨의 정보가 보여야 합니다.
  - [x] 리스트의 각 문제들을 눌렀을때, `/problems/:problem_id` 페이지로 이동하도록 해주세요.

### 3. GET `/problems/:problem_id`

  - [x] `problem_id`에 해당하는 문제의 상세 정보(문제 이름, 정답자 수, 문제 레벨, 그리고 문제에 대한 설명 등)을 화면에 보여주세요. UI 구성은 자유롭게 해주세요.
  - [x] 문제에 대한 솔루션 코드를 입력할 수 있는 폼과 정답을 제출할 수 있는 버튼을 보여주세요.
  - [x] 해당 폼을 작성하여 "제출" 버튼을 눌렀을때, `POST /problems/:problem_id`로 솔루션 정보를 보내세요. **AJAX는 사용하지 마세요.**

#### Resource
- [CodeMirror](https://github.com/codemirror/CodeMirror): In-browser code editor

### 4. POST `/problems/:problem_id`

  - [ ] 클라이언트로부터 제출받은 코드 정보를 데이터베이스의 정답 코드를 이용하여 정답이 모두 일치하는지 판별하고 아래와 같은 형식으로 대응해주세요.
  - [ ] 제출된 코드가 테스트를 모두 통과했을 경우, `success.ejs` 템플릿을 생성하여 축하 메시지를 보여주세요. 그리고 다시 문제 리스트 화면으로 이동할 수 있는 링크도 보여주세요.
  - [ ] 제출된 코드가 테스트를 모두 통과하지 못했을 경우, `failure.ejs` 템플릿을 생성하여 결과를 보여주세요. 어떤 테스트가 통과하지 못하였는지에 대한 설명도 보여주세요.
  - [ ] 제출된 코드로 인한 실행 오류가 발생했을 경우, `failure.ejs` 템플릿을 보여주어야 하고 어떤 오류가 발생했는지 상세히 표기해주어야 합니다.
  - [ ] 그 이외에 서버 내부적인 코드 실행 오류가 발생했을 경우, `error.ejs`를 이용하여 사용자에게 오류 메시지를 보여주세요.
  - [ ] 사용자가 제출한 코드를 실행하는 방법에 대해서 깊이 고민해보시기 바랍니다.

### 5. Error & Invalid URL

  - [x] 오류 발생시, 발생한 문제에 대한 메시지와 함께 `error.ejs` 템플릿을 보여주세요.
  - [x] 유효하지 않은 URL로 들어왔을 경우, 404 Not Found 메시지를 표기해주어야 합니다.
  - [x] 서버 내부적인 문제가 발생했을 경우, 500 Internal Server Error 메시지를 표기해주어야 합니다. (보안 상의 이유로 사용자에게는 절대 내부 오류에 대한 상세 내용을 보여주어선 안됩니다.)

### 6. Advanced

* Server Unit Test 작성하기
* Deploy your Express application
* Deploy your MongoDB using cloud services: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/lp/general)

#### Resources

- [Unit Testing Express Controller Part 1](https://www.techighness.com/post/unit-testing-expressjs-controller-part-1/)
- [Unit Testing Express Controller Part 2](https://www.techighness.com/post/unit-testing-expressjs-controller-part-2/)
- [Deploying Express app to production](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/deployment)

**곧 AWS Cloud Service를 이용하여 서버를 배포하는 방법에 대해 배우게 될테니, 우선 위 링크를 따라해보세요.**
