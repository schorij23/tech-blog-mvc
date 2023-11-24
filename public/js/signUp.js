const signUpFormHandler = async (event) =>{
  event.preventDefault();

  const username = document.querySelector('#username-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (username && password) {
    try { 
      const response = await fetch('/api/users/', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    document.location.replace('/dashboard');

    // if (response.ok) {
    //   document.location.replace('/dashboard');
    // } else {
    //   alert('Failed to sign up');
    // }
      } catch (error) {
        console.log(error);
        alert('Failed to sign up')
       
};
}
}
document
  .querySelector('.signup-form')
  .addEventListener('submit', signUpFormHandler);
