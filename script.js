document.addEventListener("DOMContentLoaded", function () {
  // Helper function to show error for a specific field
  function showError(element, message) {
    const errorElement = element.nextElementSibling; // Assuming the error message is next to the input
    errorElement.textContent = message;
    errorElement.style.display = "block"; // Show error message
    element.classList.remove("valid-border"); // Remove valid class
    element.classList.add("error-border"); // Add error-border class
  }

  // Helper function to clear error for a specific field
  function clearError(element) {
    const errorElement = element.nextElementSibling;
    errorElement.textContent = "";
    errorElement.style.display = "none"; // Hide the error message
    element.classList.remove("error-border"); // Remove error-border class
    element.classList.add("valid-border"); // Add valid-border class if needed
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
      input.classList.add("valid-border"); // Add valid-border class
      input.classList.remove("error-border"); // Remove error-border class
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
  document.getElementById("hamburger").addEventListener("click", function () {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("open");
  });

  // Function to show the modal
  function showModal(message) {
    const modal = document.getElementById("confirmationModal");
    const modalContent = modal.querySelector("p"); // Access the <p> directly inside the modal
    modalContent.textContent = message; // Set the message in the modal
    modal.style.display = "block"; // Show the modal
  }

  // Function to hide the modal
  function closeModal() {
    const modal = document.getElementById("confirmationModal");
    modal.style.display = "none"; // Hide the modal
  }

  // Submit Button: Check all fields on form submission
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
      event.preventDefault(); // Prevent actual form submission for demo
      showModal("Form successfully validated!"); // Show modal on successful validation
    }
  });

  // Reset function to clear all errors when the page loads
  function resetForm() {
    document.querySelectorAll("input, select").forEach((input) => {
      clearError(input);
      input.classList.remove("valid-border", "error-border"); // Reset class on load
    });
  }

  // Reset form errors when page loads
  window.addEventListener("load", resetForm);

  // Close modal event listener
  document.querySelector(".close-button").addEventListener("click", closeModal);
  window.addEventListener("click", function (event) {
    const modal = document.getElementById("confirmationModal");
    if (event.target === modal) {
      closeModal();
    }
  });
});
