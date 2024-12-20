document.addEventListener('DOMContentLoaded', function() {
    // Add an event listener for the login form submission
    document.querySelector('#login-form').addEventListener('submit', function(event) {
        event.preventDefault();  // Prevent default form submission behavior

        const username = document.querySelector('#username').value;
        const password = document.querySelector('#password').value;

        // Validate if username and password are provided
        if (!username || !password) {
            alert('Please enter both username and password.');
            return;
        }

        // Send login credentials to the backend via fetch
        fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
        .then(response => {
            if (!response.ok) {
                // Handle if the response is not OK (400, 500, etc.)
                return Promise.reject('Login failed. Please check your credentials.');
            }
            return response.json();  // Parse the response as JSON
        })
        .then(data => {
            if (data.status === 'success') {
                // Redirect to dashboard on successful login
                window.location.href = 'dashboard.html';  
            } else {
                alert(data.message || 'Login failed');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert(error || 'An error occurred. Please try again.');
        });
    });
});
