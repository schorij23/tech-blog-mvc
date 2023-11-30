const signUpFormHandler = async (event) =>{
  event.preventDefault();
  // Get the values of the username and password from the form inputs remove whitespace
  const username = document.querySelector('#username-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();
  // Check if both username and password are provided
  if (username && password) {
    try { 
      // Send a POST request to the '/api/users/' endpoint with the sign-up data
      const response = await fetch('/api/users/', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    // Redirect to the dashboard page if the sign-up is successful
    document.location.replace('/dashboard');
      } catch (error) {
        console.log(error);
        alert('Failed to sign up')
       
};
}
}
document
  .querySelector('.signup-form')
  .addEventListener('submit', signUpFormHandler);
