// Helper function to show error for a specific field
function showError(element, message) {
  const errorElement = element.nextElementSibling;
  errorElement.textContent = message;
  errorElement.style.display = "block";
  element.style.border = "2px solid red";
}

// Helper function to clear error for a specific field
function clearError(element) {
  const errorElement = element.nextElementSibling;
  errorElement.textContent = "";
  errorElement.style.display = "none";
  element.style.border = "2px solid green";
}

// Validation function for each input field
function validateField(input) {
  const id = input.id;
  let isValid = true;

  switch (id) {
    case "name":
      const namePattern = /^[A-Za-z\s]+$/;
      if (!namePattern.test(input.value)) {
        showError(input, "Name must contain only alphabetic characters.");
        isValid = false;
      } else {
        clearError(input);
      }
      break;

    case "phone":
      const phonePattern = /^\d{3}-\d{3}-\d{4}$/;
      if (!phonePattern.test(input.value)) {
        showError(input, "Phone number must be in the format: 123-456-7890.");
        isValid = false;
      } else {
        clearError(input);
      }
      break;

    case "email":
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(input.value)) {
        showError(input, "Please enter a valid email address.");
        isValid = false;
      } else {
        clearError(input);
      }
      break;

    case "dob":
      if (!input.value) {
        showError(input, "Please select a valid date of birth.");
        isValid = false;
      } else {
        clearError(input);
      }
      break;

    case "position":
      if (input.value.trim() === "") {
        showError(input, "Please enter the position.");
        isValid = false;
      } else {
        clearError(input);
      }
      break;

    case "department":
      if (input.value === "") {
        showError(input, "Please select a department.");
        isValid = false;
      } else {
        clearError(input);
      }
      break;

    case "start_date":
      const today = new Date().toISOString().split("T")[0];
      if (input.value > today) {
        showError(input, "Start date cannot be in the future.");
        isValid = false;
      } else {
        clearError(input);
      }
      break;
  }

  return isValid;
}

// Real-time validation: Validate on blur (when moving out of the field)
document.querySelectorAll("input, select").forEach((input) => {
  // On blur event (when leaving the field)
  input.addEventListener("blur", function () {
    validateField(input);
  });
});

// Submit Button: Check all fields on form submission
const submitButton = document.querySelector('button[type="submit"]');
const form = document.getElementById("employeeForm");

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
    alert("Form successfully validated!");
  }
});
