document.addEventListener("DOMContentLoaded", function () {
  // --- Sidebar Toggle ---
  document.getElementById("hamburger").addEventListener("click", function () {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("open");
  });

  // --- Helper Functions ---

  // Show error for a specific field
  function showError(element, message) {
    const errorElement = element.nextElementSibling;
    errorElement.textContent = message;
    errorElement.style.display = "block";
    element.classList.remove("valid-border");
    element.classList.add("error-border");
  }

  // Clear error for a specific field
  function clearError(element) {
    const errorElement = element.nextElementSibling;
    errorElement.textContent = "";
    errorElement.style.display = "none";
    element.classList.remove("error-border");
    element.classList.add("valid-border");
  }

  // --- Validation Functions ---

  // Validate a specific input field
  function validateField(input) {
    const id = input.id;
    let isValid = true;

    // Check if field is empty
    if (input.value.trim() === "") {
      clearError(input);
      return false;
    } else {
      clearError(input);
    }

    // Perform field-specific validation
    switch (id) {
      case "name":
        const namePattern = /^[A-Za-z\s]+$/;
        if (!namePattern.test(input.value)) {
          showError(input, "Name must contain only alphabetic characters.");
          isValid = false;
        }
        break;

      case "phone":
        const phonePattern = /^\d{3}-\d{3}-\d{4}$/;
        if (!phonePattern.test(input.value)) {
          showError(input, "Phone number must be in the format: 123-456-7890.");
          isValid = false;
        }
        break;

      case "email":
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(input.value)) {
          showError(input, "Please enter a valid email address.");
          isValid = false;
        }
        break;

      case "dob":
        if (!input.value) {
          showError(input, "Please select a valid date of birth.");
          isValid = false;
        }
        break;

      case "position":
        if (input.value.trim() === "") {
          showError(input, "Please enter the position.");
          isValid = false;
        }
        break;

      case "department":
        if (input.value === "") {
          showError(input, "Please select a department.");
          isValid = false;
        }
        break;

      case "start_date":
        const today = new Date().toISOString().split("T")[0];
        if (input.value > today) {
          showError(input, "Start date cannot be in the future.");
          isValid = false;
        }
        break;
    }

    // Apply valid-border class if input is valid
    if (isValid) {
      input.classList.add("valid-border");
      input.classList.remove("error-border");
    }

    return isValid;
  }

  // --- Real-Time Validation ---

  document.querySelectorAll("input, select").forEach((input) => {
    input.addEventListener("input", () => validateField(input));
    input.addEventListener("blur", () => validateField(input));
  });

  // --- Modal Functions ---
  function showModal(message) {
    const modal = document.getElementById("confirmationModal");
    const modalContent = modal.querySelector("p");
    modalContent.textContent = message;
    modal.style.display = "block";
  }

  function closeModal() {
    const modal = document.getElementById("confirmationModal");
    modal.style.display = "none";
  }

  document.querySelector(".close-button").addEventListener("click", closeModal);
  window.addEventListener("click", function (event) {
    const modal = document.getElementById("confirmationModal");
    if (event.target === modal) {
      closeModal();
    }
  });

  // --- Form Submission ---
  const form = document.getElementById("employeeForm");

  form.addEventListener("submit", function (event) {
    let allValid = true;

    document.querySelectorAll("input, select").forEach((input) => {
      if (!validateField(input)) {
        allValid = false;
      }
    });

    // Prevent form submission if there are validation errors
    if (!allValid) {
      event.preventDefault();
    } else {
      event.preventDefault(); // Prevent default form submission for demo
      showModal("Form successfully validated!");

      // Collect form data
      const name = document.getElementById("name").value;
      const phone = document.getElementById("phone").value;
      const email = document.getElementById("email").value;
      const dob = document.getElementById("dob").value;
      const position = document.getElementById("position").value;
      const department = document.getElementById("department").value;
      const startDate = document.getElementById("start_date").value;

      // Insert data into the table
      const table = document.getElementById("employeeTable").querySelector("tbody");
      const newRow = table.insertRow();
      newRow.insertCell(0).innerText = name;
      newRow.insertCell(1).innerText = phone;
      newRow.insertCell(2).innerText = email;
      newRow.insertCell(3).innerText = dob;
      newRow.insertCell(4).innerText = position;
      newRow.insertCell(5).innerText = department;
      newRow.insertCell(6).innerText = startDate;

      // Show the details section
      showSection("details-section");

      // Optionally reset form after submission
      form.reset();

      // Show confirmation modal
      showModal("Form submitted successfully!");
    }
  });

  // --- Reset Form on Load ---
  function resetForm() {
    document.querySelectorAll("input, select").forEach((input) => {
      clearError(input);
      input.classList.remove("valid-border", "error-border");
    });
  }

  window.addEventListener("load", resetForm);

  // --- Section Switching ---
  function showSection(sectionId) {
    document.getElementById("main-content").style.display = "none";
    document.getElementById("details-section").style.display = "block";
  }
});
