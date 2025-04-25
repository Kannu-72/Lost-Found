document.getElementById('registrationForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');
    const messageEl = document.getElementById('message');

    if (password !== confirmPassword) {
        messageEl.textContent = 'Passwords do not match!';
        messageEl.style.color = 'red';
        return;
    }

    const data = {
        name: formData.get('name'),
        username: formData.get('username'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        password: password,
    };

    try {
        const response = await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (response.ok) {
            messageEl.textContent = result.message || 'Registered successfully!';
            messageEl.style.color = 'green';

            setTimeout(() => {
                window.location.href = '/login.html';
            }, 1000);
        } else {
            messageEl.textContent = result.message || 'Registration failed!';
            messageEl.style.color = 'red';
        }
    } catch (error) {
        console.error('Error during registration:', error);
        messageEl.textContent = 'Something went wrong!';
        messageEl.style.color = 'red';
    }
});
