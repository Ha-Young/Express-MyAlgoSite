const $inputName = document.querySelector(".input-user-name");
const $inputEmail = document.querySelector(".input-user-email");
const $inputPassword = document.querySelector(".input-user-password");
const $inputPasswordConfirm = document.querySelector(".input-user-password-confirm");
const $message = document.querySelector(".message");
const $loginLinkButton = document.querySelector(".login-link-button");
const $createAccountButton = document.querySelector(".create-account-button");
const $form = document.querySelector(".create-account-form");

const setMessage = (message) => {
  $message.textContent = message;
}

const verifyInput = (e) => {
  if ($inputName.value.length >= 20) {
    return {
      result: false,
      message: `Name must be 20 characters or less. \nCurrent length: ${$inputName.value.length}`,
    };
  }

  if ($inputPassword.value !== $inputPasswordConfirm.value) {
    return {
      result: false,
      message: `Those passwords didn’t match.`,
    };
  }

  return {
    result: true,
  };
};

const handleLoginLinkButtonClick = (e) => {
  location.href = '/login';
};

const handleSubmit = (e) => {
  const verificationResult = verifyInput(e);

  if (!verificationResult.result) {
    e.preventDefault();
    setMessage(verificationResult.message);
  }
};

$loginLinkButton.addEventListener("click", handleLoginLinkButtonClick);
$form.addEventListener("submit", handleSubmit);
