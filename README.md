# Codewars

등록되어 있는 알고리즘 문제를 풀 수 있는 어플리케이션입니다.

## 프로젝트 구성 요소

### npm

  - [ ] `npm install` 실행

### MongoDB 설치하기

4번 진행할때 설치하시면 됩니다. 직접 로컬에 설치하지 않고 [mlab](https://mlab.com)을 이용하셔도 됩니다.

  - [ ] [MongoDB 설치](https://docs.mongodb.com/manual/installation/)
  - [ ] 로컬에서 데이터베이스 실행하기

## 구현해야 할 사항들

### 1. GET `/`

  - [ ] `/views/index.ejs` template을 보여주어야 합니다.
  - [ ] 기존 템플릿에 있는 문제 정보를 지우고, `/data/problems.json`에 있는 데이터를 이용하여 다이나믹하게 보여주도록 `index.ejs` 템플릿 내부의 내용을 수정해주세요. 기존과 똑같이 문제 이름, 정답자 수, 문제 레벨의 정보가 보여야 합니다.
  - [ ] Level 1,2,3에 해당하는 탭을 눌렀을때, 해당 레벨에 속하는 문제들만 필터링하여 보여주도록 수정해주세요.
  - [ ] 리스트의 각 문제들을 눌렀을때, `/problems/:problem_id` 페이지로 이동하도록 해주세요.

### 2. GET `/problems/:problem_id`

  - [ ] `problem_id`에 해당하는 id값을 가진 문제의 설명을 화면에 보여주세요. 문제 이름, 정답자 수, 문제 레벨, 그리고 문제 설명이 모두 보여야 합니다. 템플릿에 보여주는 형식은 자유롭게 해주세요. (템플릿 생성 필요)
  - [ ] 해당 화면에서 해당 문제에 대한 솔루션을 입력할 수 있는 폼과 정답을 제출할 수 있는 버튼을 보여주세요.
  - [ ] 해당 폼을 작성하여 "제출" 버튼을 눌렀을때, `POST /problems/:problem_id`로 솔루션 정보를 보내주세요. (정보를 전달해주는 형식에 대해 신중히 생각해보고 결정하기 바랍니다.)

### 3. POST `/problems/:problem_id`

  - [ ] 해당 문제에 대해 제출받은 답안을 `/data/problems.json`에 있는 테스트 내용을 기반으로 실행하여 정답이 모두 일치하는지 판별하여 아래와 같은 형식으로 대응해주세요.
  - [ ] 제출된 코드가 테스트를 모두 통과했을 경우, `success.ejs` 템플릿을 생성하여 축하 메시지를 보여주세요. 그리고 다시 문제 리스트 화면으로 이동할 수 있는 링크도 보여주세요.
  - [ ] 제출된 코드가 테스트를 통과하지 못했을 경우, `failure.ejs` 템플릿을 생성하여 결과를 보여주세요. 어떤 테스트가 통과하지 못하였는지에 대한 내용도 보여주세요.
  - [ ] 제출된 코드 실행 도중 문제가 발생했을 경우, 발생한 문제에 대한 메시지와 함께 `error.ejs` 템플릿을 보여주세요.

### 4. MongoDB 이용하기

  - [ ] 현재 `/data/problems.json` 데이터를 저장하기 알맞은 Database Schema를 구상해보세요. [참고 링크](http://mongoosejs.com/docs/guide.html)
  - [ ] 현재 사용하는 `/data/problems.json` 데이터를 [mlab](https://mlab.com/) 혹은 로컬 MongoDB를 이용하여 본인의 데이터베이스에 import 시켜주세요.
  - [ ] `/data/problems.json`의 자료를 이용하던 모든 부분을 위에서 작업한 실제 데이터베이스를 이용하도록 수정해주세요.

### 5. Extra: AWS Elastic Beanstalk에 배포하기

  - [ ] [AWS](https://aws.amazon.com/) Elastic Beanstalk을 이용하여 배포하여 보세요. [참고 문서](https://github.com/vanilla-coding/docs/wiki/Setting-up-AWS-Elastic-Beanstalk)

## Resources

* [NodeJS](https://nodejs.org/api/)
* [Express](https://expressjs.com/)
* [Mongoose](http://mongoosejs.com/)
