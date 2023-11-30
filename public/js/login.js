const loginFormHandler = async (event) => {
    event.preventDefault();
    // Get values of username and password from forms and trim whitespace
    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
    // Check if both username and password are provided
    if (username && password) {
      // POST request to the '/api/users/login' endpoint with the login credentials
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });
      // Redirect to the '/dashboard' page if the login is successful
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to log in');
      }
    }
  };
  
  document
    .querySelector('.login-form')
    .addEventListener('submit', loginFormHandler);
  