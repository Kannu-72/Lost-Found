document.getElementById("login-form").addEventListener("submit", async function (e) {
    e.preventDefault();

    // Get form data
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value;

    try {
        // Send POST request to backend with login credentials
        const response = await fetch("/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password, role })
        });

        const data = await response.json();

        if (response.ok) {
            // If login is successful, redirect to appropriate page
            alert("Login successful!");
            if (role === 'admin') {
                window.location.href = "admin.html";  // Redirect to admin dashboard if admin
            } else if (role === 'user') {
                window.location.href = "feeduser.html";  // Redirect to user feed page if user
            }
        } else {
            // Display error message if login fails
            alert(data.message || "Something went wrong. Please try again.");
        }
    } catch (error) {
        // Catch any unexpected errors
        console.error("Login error:", error);
        alert("Something went wrong. Please try again.");
    }
});
