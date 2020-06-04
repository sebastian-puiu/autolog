function validateForm(event, state) {
  // clear all error messages
  const inputs = document.getElementsByClassName("is-danger");
  for (let i = 0; i < inputs.length; i++) {
    if (!inputs[i].classList.contains("error")) {
      inputs[i].classList.remove("is-danger");
    }
  }

  if (state.hasOwnProperty("username") && state.username === "") {
    document.getElementById("username").classList.add("is-danger");
    return { blankfield: true };
  }
  if (state.hasOwnProperty("firstname") && state.firstname === "") {
    document.getElementById("firstname").classList.add("is-danger");
    return { blankfield: true };
  }
  if (state.hasOwnProperty("lastname") && state.lastname === "") {
    document.getElementById("lastname").classList.add("is-danger");
    return { blankfield: true };
  }
  if (state.hasOwnProperty("email") && state.email === "") {
    document.getElementById("email").classList.add("is-danger");
    return { blankfield: true };
  }
  if (
    state.hasOwnProperty("verificationcode") &&
    state.verificationcode === ""
  ) {
    document.getElementById("verificationcode").classList.add("is-danger");
    return { blankfield: true };
  }
  if (state.hasOwnProperty("password") && state.password === "") {
    document.getElementById("password").classList.add("is-danger");
    return { blankfield: true };
  }
  if (state.hasOwnProperty("oldpassword") && state.oldpassword === "") {
    document.getElementById("oldpassword").classList.add("is-danger");
    return { blankfield: true };
  }
  if (state.hasOwnProperty("newpassword") && state.newpassword === "") {
    document.getElementById("newpassword").classList.add("is-danger");
    return { blankfield: true };
  }
  if (state.hasOwnProperty("confirmpassword") && state.confirmpassword === "") {
    document.getElementById("confirmpassword").classList.add("is-danger");
    return { blankfield: true };
  }
  if (
    state.hasOwnProperty("password") &&
    state.hasOwnProperty("confirmpassword") &&
    state.password !== state.confirmpassword
  ) {
    document.getElementById("password").classList.add("is-danger");
    document.getElementById("confirmpassword").classList.add("is-danger");
    return { passwordmatch: true };
  }
  if (
    state.hasOwnProperty("newpassword") &&
    state.hasOwnProperty("confirmpassword") &&
    state.newpassword !== state.confirmpassword
  ) {
    document.getElementById("newpassword").classList.add("is-danger");
    document.getElementById("confirmpassword").classList.add("is-danger");
    return { passwordmatch: true };
  }

  // Vehicles form validation
  if (state.hasOwnProperty("make") && state.make === "") {
    document.getElementById("make").classList.add("is-danger");
    return { blankfield: true };
  }
  if (state.hasOwnProperty("model") && state.model === "") {
    document.getElementById("model").classList.add("is-danger");
    return { blankfield: true };
  }
  if (state.hasOwnProperty("year") && state.year === "") {
    document.getElementById("year").classList.add("is-danger");
    return { blankfield: true };
  }

  if (state.hasOwnProperty("updatedmake") && state.updatedvehiclemake === "") {
    document.getElementById("updatedmake").classList.add("is-danger");
    return { blankfield: true };
  }
  if (state.hasOwnProperty("updatedmodel") && state.updatedvehiclemodel === "") {
    document.getElementById("updatedmodel").classList.add("is-danger");
    return { blankfield: true };
  }
  if (state.hasOwnProperty("updatedyear") && state.updatedvehicleyear === "") {
    document.getElementById("updatedyear").classList.add("is-danger");
    return { blankfield: true };
  }

  // Contact form validation
  if (state.hasOwnProperty("subject") && state.subject === "") {
    document.getElementById("subject").classList.add("is-danger");
    return { blankfield: true };
  }
  if (state.hasOwnProperty("message") && state.message === "") {
    document.getElementById("message").classList.add("is-danger");
    return { blankfield: true };
  }
  return;
}

export default validateForm;