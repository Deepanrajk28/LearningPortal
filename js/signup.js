document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('#signup-form').addEventListener('submit', function(event) {
        event.preventDefault();  // Prevent form submission

        const username = document.querySelector('#username').value;
        const email = document.querySelector('#email').value;
        const password = document.querySelector('#password').value;
        const confirmPassword = document.querySelector('#confirm-password').value;

        // Validate passwords match
        if (password !== confirmPassword) {
            alert('Passwords do not match.');
            return;
        }

        // Simple password strength check (optional)
        if (password.length < 6) {
            alert('Password should be at least 6 characters long.');
            return;
        }

        // Send data to the backend via fetch
        fetch('http://localhost:3000/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.status === 'success') {
                // Redirect to login page
                window.location.href = 'index.html';  // Redirect to login page
            } else {
                alert(data.message || 'Signup failed');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        });
    });
});
