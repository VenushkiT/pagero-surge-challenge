// Helper function to show error for a specific field
function showError(element, message) {
  const errorElement = element.nextElementSibling; // Assuming the error message is next to the input
  errorElement.textContent = message;
  errorElement.style.display = "block"; // Show error message
  element.classList.remove("valid"); // Remove valid class
  element.classList.add("invalid"); // Add invalid class
}

// Helper function to clear error for a specific field
function clearError(element) {
  const errorElement = element.nextElementSibling;
  errorElement.textContent = "";
  errorElement.style.display = "none"; // Hide the error message
  element.classList.remove("invalid"); // Remove invalid class
}

// Validation function for each input field
function validateField(input) {
  const id = input.id;
  let isValid = true;

  // Check if the field is empty
  if (input.value.trim() === "") {
    showError(input, "This field cannot be empty.");
    return false; // Return false if empty
  } else {
    clearError(input);
  }

  // Additional validations based on the input field type
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

  // Highlight valid input fields
  if (isValid) {
    input.classList.add("valid"); // Add valid class
    input.classList.remove("invalid"); // Remove invalid class
  }

  return isValid;
}

// Real-time validation: Validate on input (as the user types)
document.querySelectorAll("input, select").forEach((input) => {
  // On input event (while typing)
  input.addEventListener("input", function () {
    validateField(input); // Validate field in real-time
  });

  // Also validate on blur (when the input loses focus)
  input.addEventListener("blur", function () {
    validateField(input); // Validate field when focus is lost
  });
});

// Submit Button: Check all fields on form submission
const form = document.getElementById("employeeForm");
const confirmationMessage = document.getElementById("confirmationMessage");

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
    alert("Form successfully validated!"); // Show alert on successful validation
    confirmationMessage.textContent = ""; // Clear previous confirmation message
    confirmationMessage.style.display = "block"; // Show confirmation message
  }
});

// Reset function to clear all errors when the page loads
function resetForm() {
  document.querySelectorAll("input, select").forEach((input) => {
    clearError(input);
    input.classList.remove("valid", "invalid"); // Reset class on load
  });
}

// Reset form errors when page loads
window.addEventListener("load", resetForm);
