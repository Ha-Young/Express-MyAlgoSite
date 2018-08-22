# Codewars

등록되어 있는 알고리즘 문제를 풀 수 있는 어플리케이션입니다.

## 프로젝트 구성 요소

### npm

  - [ ] `npm install` 실행

### MongoDB 설치하기

  - [ ] [MongoDB 설치](https://docs.mongodb.com/manual/installation/)
  - [ ] 로컬에서 데이터베이스 실행하기

## 구현해야 할 사항들

### 1. GET `/hello-world`

  - [ ] `{ message: "hello, I am a node server!" }`를 JSON 형식의 응답으로 보내주세요.

### 1. GET `/`

  - [ ] `/views/index.ejs` template을 보여주어야 합니다.
  - [ ] 기존 템플릿에 있는 문제 정보를 지우고, `/data/problems.json`에 있는 데이터를 이용하여 보여주도록 `index.ejs` 템플릿 내부의 내용을 수정해주세요.
  - [ ] Level 1,2,3에 해당하는 탭을 눌렀을때, 해당 레벨에 속하는 문제들만 보여주도록 수정해주세요.
  - [ ] 리스트의 각 문제들을 눌렀을때, `/problems/:problem_id` 페이지로 이동하도록 템플릿을 수정해주세요.

### 3. GET `/problems/:problem_id`

  - [ ] `problem_id`에 해당하는 id값을 가진 문제의 설명을 화면에 보여주세요. (템플릿 생성 필요)
  - [ ] 해당 화면에서 해당 문제에 대한 솔루션을 입력할 수 있는 폼을 보여주세요.
  - [ ] 해당 폼을 작성하여 "제출" 버튼을 눌렀을때, `POST /problems/:problem_id`로 솔루션 정보를 보내주세요.

### 4. POST `/problems/:problem_id`

  - [ ] 해당 문제에 대해 제출받은 답안을 `/data/problems.json`에 있는 테스트 내용을 기반으로 실행하여 정답이 모두 일치하는지 판별하여 아래와 같은 형식으로 대응해주세요.
  - [ ] 코드 예제가 테스트를 통과하지 못했을 경우, `failure.ejs` 템플릿을 생성하여 결과를 보여주세요.
  - [ ] 코드 예제가 테스트를 모두 통과했을 경우, `success.ejs` 템플릿을 생성하여 결과를 보여주세요.
  - [ ] 코드 예제 실행 도중 문제가 발생했을 경우, `error.ejs` 적절한 메시지와 함께 템플릿을 보여주세요.

### 5. MongoDB 이용하기

  - [ ] 현재 `/data/problems.json` 데이터를 저장하기 알맞은 Database Schema를 구상해보세요. [참고 링크](http://mongoosejs.com/docs/guide.html)
  - [ ] 현재 사용하는 `/data/problems.json` 데이터를 [mlab](https://mlab.com/) 혹은 로컬 MongoDB를 이용하여 본인의 데이터베이스에 import 시켜주세요.
  - [ ] `/data/problems.json`의 자료를 이용하던 모든 부분을 위에서 작업한 실제 데이터베이스를 이용하도록 수정해주세요.

### 6. Extra: AWS Elastic Beanstalk에 배포하기

  - [ ] [AWS](https://aws.amazon.com/) Elastic Beanstalk을 이용하여 배포하여 보세요. [참고 문서](https://github.com/vanilla-coding/docs/wiki/Setting-up-AWS-Elastic-Beanstalk)

## Resources

* [NodeJS](https://nodejs.org/api/)
* [Express](https://expressjs.com/)
* [Mongoose](http://mongoosejs.com/)
