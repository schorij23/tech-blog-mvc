const logout = async () => {
  // POST request to the '/api/users/logout' endpoint
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    // Redirect to the home page if the logout is successful
    document.location.replace('/');
  } else {
    alert('Failed to log out');
  }
};

document.querySelector('#logout').addEventListener('click', logout);
