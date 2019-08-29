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

기본적인 과제 프로젝트 구성을 따르되, [Project Structure](https://www.freecodecamp.org/news/how-to-write-a-production-ready-node-and-express-app-f214f0b17d8c/) 등의 인터넷 자료를 이용하여 자유롭게 변경하셔도 됩니다.

## Resources

- [CodeMirror](https://github.com/codemirror/CodeMirror): In-browser code editor
- [Unit Testing Express Controller Part 1](https://www.techighness.com/post/unit-testing-expressjs-controller-part-1/)
- [Unit Testing Express Controller Part 2](https://www.techighness.com/post/unit-testing-expressjs-controller-part-2/)

## TODO

### 1. GET `/`

  - [ ] `/views/index.ejs` template을 보여주어야 합니다.
  - [ ] 기존 템플릿에 있는 문제 정보를 지우고, `/data/problems.json`에 있는 데이터를 이용하여 페이지에 문제 정보를  보여주도록 `index.ejs` 템플릿 내부의 내용을 수정해주세요. 문제 이름, 정답자 수, 문제 레벨의 정보가 보여야 합니다.
  - [ ] 리스트의 각 문제들을 눌렀을때, `/problems/:problem_id` 페이지로 이동하도록 해주세요.

### 2. GET `/problems/:problem_id`

  - [ ] `problem_id`에 해당하는 문제의 상세 정보(문제 이름, 정답자 수, 문제 레벨, 그리고 문제에 대한 설명 등)을 화면에 보여주세요. UI 구성은 자유롭게 해주세요.
  - [ ] 문제에 대한 솔루션 코드를 입력할 수 있는 폼과 정답을 제출할 수 있는 버튼을 보여주세요.
  - [ ] 해당 폼을 작성하여 "제출" 버튼을 눌렀을때, `POST /problems/:problem_id`로 솔루션 정보를 보내세요.
  - [ ] 솔루션 정보를 보낼때는 [Form tag](https://www.w3schools.com/tags/tag_form.asp)의 기본 기능을 이용하세요.

### 3. POST `/problems/:problem_id`

  - [ ] 클라이언트로부터 제출받은 코드 정보를 `/data/problems.json`에 있는 내용을 이용하여 정답이 모두 일치하는지 판별하고 아래와 같은 형식으로 대응해주세요.
  - [ ] 제출된 코드가 테스트를 모두 통과했을 경우, `success.ejs` 템플릿을 생성하여 축하 메시지를 보여주세요. 그리고 다시 문제 리스트 화면으로 이동할 수 있는 링크도 보여주세요.
  - [ ] 제출된 코드가 테스트를 모두 통과하지 못했을 경우, `failure.ejs` 템플릿을 생성하여 결과를 보여주세요. 어떤 테스트가 통과하지 못하였는지에 대한 설명도 보여주세요.
  - [ ] 제출된 코드로 인한 실행 오류가 발생했을 경우, `failure.ejs` 템플릿을 보여주어야 하고 어떤 오류가 발생했는지 상세히 표기해주어야 합니다.
  - [ ] 그 이외의 서버 내부적인 코드 실행 오류가 발생했을 경우, `/error` 페이지로 사용자를 이동시켜야 합니다.

### 4. GET `/error`

  - [ ] 발생한 문제에 대한 메시지와 함께 `error.ejs` 템플릿을 보여주세요.
  - [ ] 유효하지 않은 URL로 들어왔을 경우, 404 Not Found 메시지를 표기해주어야 합니다.
  - [ ] 서버 내부적인 문제가 발생했을 경우, 500 Internal Server Error 메시지를 표기해주어야 합니다. (보안 상의 이유로 사용자에게는 절대 내부 오류에 대한 상세 내용을 보여주어선 안됩니다.)

### 5. Advanced

* Server Unit Test 작성하기
* `/data/problems.json`의 정보를 MongoDB를 이용하여 관리하기
* Deploy your Express application: [Heroku](https://www.heroku.com/), [Microsoft Azure](https://azure.microsoft.com/en-us/pricing/details/app-service/windows/), [Amazon Web Services](https://aws.amazon.com)(Elastic Beanstalk)
* Deploy your MongoDB using cloud services: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/lp/general)
