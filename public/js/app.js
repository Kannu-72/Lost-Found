document.addEventListener("DOMContentLoaded", function () {
    // Toggle Mobile Navigation Menu
    const menuToggle = document.querySelector(".menu-toggle");
    if (menuToggle) {
        menuToggle.addEventListener("click", function () {
            document.querySelector("nav").classList.toggle("open");
        });
    }

    // Show success message if redirected after an action
    const successMessage = document.querySelector(".success-message");
    if (successMessage) {
        setTimeout(() => successMessage.style.display = "none", 3000);
    }
});
