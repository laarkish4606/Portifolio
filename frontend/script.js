
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const nameInput = document.querySelector('input[type="text"]');
  const emailInput = document.querySelector('input[type="email"]');
  const messageInput = document.querySelector("textarea");

  form.addEventListener("submit", (e) => {
    e.preventDefault(); // Stop form submission until validation passes

    // Remove previous error messages
    document.querySelectorAll(".error").forEach((el) => el.remove());

    let isValid = true;

    // Full name validation
    if (nameInput.value.trim() === "") {
      showError(nameInput, "Please enter your full name.");
      isValid = false;
    } else if (nameInput.value.trim().length < 3) {
      showError(nameInput, "Name must be at least 3 characters long.");
      isValid = false;
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailInput.value.trim() === "") {
      showError(emailInput, "Please enter your email address.");
      isValid = false;
    } else if (!emailPattern.test(emailInput.value.trim())) {
      showError(emailInput, "Please enter a valid email address.");
      isValid = false;
    }

    // Message validation
    if (messageInput.value.trim() === "") {
      showError(messageInput, "Please enter a message.");
      isValid = false;
    } else if (messageInput.value.trim().length < 10) {
      showError(messageInput, "Message must be at least 10 characters long.");
      isValid = false;
    }

    // If all valid — simulate success
    if (isValid) {
      alert("Thank you! Your message has been submitted successfully.");
      form.reset();
    }
  });

  // Helper function to show error
  function showError(input, message) {
    const error = document.createElement("small");
    error.classList.add("error");
    error.style.color = "red";
    error.style.display = "block";
    error.style.marginTop = "5px";
    error.textContent = message;
    input.insertAdjacentElement("afterend", error);
  }
});

document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.querySelector("input[type='text']").value;
  const email = document.querySelector("input[type='email']").value;
  const message = document.querySelector("textarea").value;

  const res = await fetch("https://localhost:5000/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, message }),
  });

  const data = await res.json();
  alert(data.success || data.error);
});

