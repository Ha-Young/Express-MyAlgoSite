/* eslint-disable no-undef */

const testCodeInputElement = document.getElementById("test-code");
const testSolutionInputElement = document.getElementById("test-solution");
const testAddBtnElement = document.getElementById("test-add");
const testListElement = document.querySelector(".test-list");
const problemCreateForm = document.getElementById("problem-create-form");

let simplemde;

function loadSimpleMDE() {
  simplemde = new SimpleMDE({ element: document.getElementById("simpleMDE") });
}

function handleTestRemoveBtnClick(e) {
  const testItemElement = e.currentTarget.parentNode;

  testItemElement.parentNode.removeChild(testItemElement);
}

function handleTestAddBtnClick(e) {
  const testCode = testCodeInputElement.value;
  const testSolution = testSolutionInputElement.value;

  if (!testCode || !testSolution) {
    alert("테스트 코드와 정답을 입력해주세요");
    return;
  }

  const liElement = document.createElement('li');
  const testCaseElement = document.createElement('span');
  const removeButton = document.createElement('button');

  liElement.className = "test-item";
  testCaseElement.className = "testcase";
  testCaseElement.textContent = `${testCode} : ${testSolution}`;
  removeButton.className = "test-remove";
  removeButton.innerHTML = '<i class="fas fa-minus"></i>';
  removeButton.type = "button";
  removeButton.addEventListener('click', handleTestRemoveBtnClick);

  liElement.appendChild(testCaseElement);
  liElement.appendChild(removeButton);

  testListElement.appendChild(liElement);

  testCodeInputElement.value = "";
  testSolutionInputElement.value = "";
}

function getTestCaseValue() {
  const testCaseItemList = testListElement.querySelectorAll('li');

  let result = [];

  for (const testCaseItem of testCaseItemList) {
    const testCase = testCaseItem.querySelector('span').textContent;
    result.push(testCase);
  }

  return result.join('\n');
}

function handleProblemCreateSubmit(e) {
  e.preventDefault();
  const form = e.target;

  const testCaseElement = document.createElement('textarea');
  testCaseElement.value = getTestCaseValue();
  testCaseElement.name = "testcase";

  form.appendChild(testCaseElement);

  form.submit();
}

loadSimpleMDE();

testAddBtnElement.addEventListener("click", handleTestAddBtnClick);
problemCreateForm.addEventListener("submit", handleProblemCreateSubmit);
