// Form validation function
function validateField(input) {
  const errorDiv = input.nextElementSibling; // Select the sibling error div
  const pattern = /^[a-zA-Z\s]*$/; // Regex pattern for text inputs (only letters)

  // Check for empty input
  if (input.value.trim() === "") {
    errorDiv.textContent = "This field cannot be empty.";
    input.classList.add("error-border"); // Add error class for styling
    return false;
  } else {
    errorDiv.textContent = ""; // Clear previous error message
    input.classList.remove("error-border"); // Remove error class
  }

  // Additional validation for phone number
  if (input.id === "phone" && !/^\d{3}-\d{3}-\d{4}$/.test(input.value)) {
    errorDiv.textContent = "Phone number must be in format 123-456-7890.";
    input.classList.add("error-border");
    return false;
  }

  // Additional validation for email
  if (input.id === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
    errorDiv.textContent = "Please enter a valid email address.";
    input.classList.add("error-border");
    return false;
  }

  // Additional validation for position (just as an example)
  if (input.id === "position" && !pattern.test(input.value)) {
    errorDiv.textContent = "Position can only contain letters.";
    input.classList.add("error-border");
    return false;
  }

  return true; // All validations passed
}

// Submit Button: Check all fields on form submission
const form = document.getElementById("employeeForm");
const confirmationMessage = document.getElementById("confirmationMessage");
const modal = document.getElementById("successModal");
const modalClose = document.getElementById("modalClose");

form.addEventListener("submit", function (event) {
  let allValid = true;
  document.querySelectorAll("input, select").forEach((input) => {
    if (!validateField(input)) {
      allValid = false;
    }
  });

  if (!allValid) {
    event.preventDefault(); // Prevent form submission if validation fails
  } else {
    event.preventDefault(); // Prevent actual form submission for demo
    modal.style.display = "block"; // Show modal on successful validation
    confirmationMessage.textContent = ""; // Clear previous confirmation message
  }
});

// Close the modal when the user clicks on <span> (x)
modalClose.onclick = function () {
  modal.style.display = "none";
};

// Close the modal when the user clicks anywhere outside of the modal
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
