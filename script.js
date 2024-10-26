document.addEventListener("DOMContentLoaded", function () {
  // Sidebar Toggle: Toggles sidebar visibility when the hamburger icon is clicked
  document.getElementById("hamburger").addEventListener("click", function () {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("open");
  });

  // Helper Functions

  // Displays an error message for a field and adds an error border style
  function showError(element, message) {
    const errorElement = element.nextElementSibling;
    errorElement.textContent = message;
    errorElement.style.display = "block";
    element.classList.remove("valid-border");
    element.classList.add("error-border");
  }

  // Clears the error message for a field and adds a valid border style
  function clearError(element) {
    const errorElement = element.nextElementSibling;
    errorElement.textContent = "";
    errorElement.style.display = "none";
    element.classList.remove("error-border");
    element.classList.add("valid-border");
  }

  // Creates Edit and Delete buttons for each table row
  function createActionButtons(row) {
    const actionsCell = row.cells[row.cells.length - 1];
    actionsCell.innerHTML = "";

    const editButton = document.createElement("button");
    editButton.className = "edit-button";
    editButton.textContent = "✏️";
    editButton.onclick = function () {
      editRow(row);
    };

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.textContent = "🗑️";
    deleteButton.onclick = function () {
      showDeleteModal(row);
    };

    actionsCell.appendChild(editButton);
    actionsCell.appendChild(deleteButton);
  }

  // Validates each input field based on its type and displays errors if invalid
  function validateField(input) {
    const id = input.id;
    let isValid = true;

    // Empty input validation
    if (input.value.trim() === "") {
      clearError(input);
      return false;
    } else {
      clearError(input);
    }

    // Specific validations based on input field ID
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

    // Adds valid-border if all validations pass
    if (isValid) {
      input.classList.add("valid-border");
      input.classList.remove("error-border");
    }

    return isValid;
  }

  // Real-Time Validation: Validates input fields in real-time as the user types or moves away
  document.querySelectorAll("input, select").forEach((input) => {
    input.addEventListener("input", () => validateField(input));
    input.addEventListener("blur", () => validateField(input));
  });

  // Modal Functions

  // Shows a modal with a specified message
  function showModal(message) {
    const modal = document.getElementById("confirmationModal");
    const modalContent = modal.querySelector("p");
    modalContent.textContent = message;
    modal.style.display = "block";
  }

  // Closes the modal
  function closeModal() {
    const modal = document.getElementById("confirmationModal");
    modal.style.display = "none";
  }

  // Closes modal when clicking outside or on the close button
  document.querySelector(".close-button").addEventListener("click", closeModal);
  window.addEventListener("click", function (event) {
    const modal = document.getElementById("confirmationModal");
    if (event.target === modal) {
      closeModal();
    }
  });

  // Delete Confirmation Modal Functions
  const deleteModal = document.getElementById("deleteModal");
  const confirmDeleteButton = document.getElementById("confirmDelete");
  const cancelDeleteButton = document.getElementById("cancelDelete");
  let currentRow;

  // Shows the delete confirmation modal for a specific row
  function showDeleteModal(row) {
    currentRow = row;
    deleteModal.style.display = "block";
  }

  // Deletes the row if deletion is confirmed
  confirmDeleteButton.onclick = function () {
    if (currentRow) {
      const tableBody = document.getElementById("employeeTable").querySelector("tbody");
      tableBody.deleteRow(currentRow.rowIndex - 1);
      showModal("Employee deleted successfully.");
    }
    deleteModal.style.display = "none";
  };

  // Cancels the deletion and closes the delete modal
  cancelDeleteButton.onclick = function () {
    deleteModal.style.display = "none";
  };

  // Closes delete modal when clicking outside or on the close button
  document.getElementById("closeDeleteModal").onclick = function () {
    deleteModal.style.display = "none";
  };
  window.onclick = function (event) {
    if (event.target === deleteModal) {
      deleteModal.style.display = "none";
    }
  };

  // Form Submission

  // Handles form submission and validates all fields before submission
  const form = document.getElementById("employeeForm");
  form.addEventListener("submit", function (event) {
    let allValid = true;

    document.querySelectorAll("input, select").forEach((input) => {
      if (!validateField(input)) {
        allValid = false;
      }
    });

    if (!allValid) {
      event.preventDefault();
    } else {
      event.preventDefault();
      showModal("Form successfully validated!");

      // Collects form data and appends it to the employee table
      const name = document.getElementById("name").value;
      const phone = document.getElementById("phone").value;
      const email = document.getElementById("email").value;
      const dob = document.getElementById("dob").value;
      const position = document.getElementById("position").value;
      const department = document.getElementById("department").value;
      const startDate = document.getElementById("start_date").value;

      const table = document.getElementById("employeeTable").querySelector("tbody");
      const newRow = table.insertRow();
      newRow.insertCell(0).innerText = name;
      newRow.insertCell(1).innerText = phone;
      newRow.insertCell(2).innerText = email;
      newRow.insertCell(3).innerText = dob;
      newRow.insertCell(4).innerText = position;
      newRow.insertCell(5).innerText = department;
      newRow.insertCell(6).innerText = startDate;
      newRow.insertCell(7);

      createActionButtons(newRow);
      showSection("details-section");

      form.reset();
      showModal("Form submitted successfully!");
    }
  });

  // Resets form on load to clear errors and borders
  function resetForm() {
    document.querySelectorAll("input, select").forEach((input) => {
      clearError(input);
      input.classList.remove("valid-border", "error-border");
    });
  }
  window.addEventListener("load", resetForm);

  // Shows a specific section by hiding others
  window.showSection = function (sectionId) {
    const sections = document.querySelectorAll("section");
    sections.forEach((section) => {
      section.style.display = "none";
    });
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
      targetSection.style.display = "block";
    }
  };

  // Edit Functionality

  // Shows edit confirmation modal and executes callback based on user choice
  function showEditConfirmationModal(callback) {
    const editModal = document.getElementById("editConfirmationModal");
    editModal.style.display = "block";

    document.getElementById("confirmEdit").onclick = function () {
      editModal.style.display = "none";
      callback(true);
    };

    document.getElementById("cancelEdit").onclick = function () {
      editModal.style.display = "none";
      callback(false);
    };

    document.getElementById("closeEditModal").onclick = function () {
      editModal.style.display = "none";
    };
  }

  // Allows editing of a row’s content by replacing cell content with input fields
  function editRow(row) {
    const cells = row.cells;
    const originalData = Array.from(cells).map((cell) => cell.innerText);

    for (let i = 0; i < cells.length - 1; i++) {
      const input = document.createElement("input");
      input.type = "text";
      input.value = originalData[i];
      cells[i].innerHTML = "";
      cells[i].appendChild(input);
    }

    const saveButton = document.createElement("button");
    saveButton.textContent = "💾";
    saveButton.className = "save-button";
    saveButton.onclick = function () {
      showEditConfirmationModal(function (confirmed) {
        if (confirmed) {
          for (let i = 0; i < cells.length - 1; i++) {
            cells[i].innerText = cells[i].querySelector("input").value;
            showModal("Saved Successfully.");
          }
          createActionButtons(row);
        } else {
          for (let i = 0; i < cells.length - 1; i++) {
            cells[i].innerText = originalData[i];
          }
          createActionButtons(row);
        }
      });
    };

    const actionsCell = cells[cells.length - 1];
    actionsCell.innerHTML = "";
    actionsCell.appendChild(saveButton);
  }
});
