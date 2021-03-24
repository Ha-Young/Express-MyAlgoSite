const codeMirror =
  CodeMirror.fromTextArea(document.querySelector(".editor"), {
    lineNumbers: true,
    tabSize: 2,
    mode: "javascript",
    theme: "material",
  });

codeMirror.setSize("100%", 500);

const problemListLinkButton = document.querySelector(".problem-list-link-button");
const submitButton = document.querySelector(".submit-button");

const handleProblemListLinkButtonClick = (e) => {
  window.location.href = "/";
}

problemListLinkButton.addEventListener("click", handleProblemListLinkButtonClick);
