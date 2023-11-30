const dashboardFormHandler = async (event) =>{
    event.preventDefault();
    // Get values from form inputs and trim white-space
    const title = document.querySelector('#blog-title').value.trim();
    const description = document.querySelector('#blog-desc').value.trim();
    // Check if both title and description are provided
    if (title && description) {

    try {
        const response = await fetch(`/api/blogs`, {
			method: 'POST',
			body: JSON.stringify({ title, description }),
			headers: {
				'Content-Type': 'application/json',},
        
    }) 
    // Redirect to the '/dashboard' page after blog success
    document.location.replace('/dashboard');

         }catch (error) {
            console.log(error);
            alert('Failed to create the blog')
        };
    }
}
// Event handler for handling clicks on delete buttons in the blog list
const delButtonHandler = async (event) => {
    // Check and retrieve if the clicked element has a 'data-id' attribute delete by id
	if (event.target.hasAttribute('data-id')) {
		const id = event.target.getAttribute('data-id');
        // Send a DELETE request to the '/api/blogs/:id' endpoint with the specified blog ID
		const response = await fetch(`/api/blogs/${id}`, {
			method: 'DELETE',
		});
        // Redirect to the dashboard if the blog deletion is successful
		if (response.ok) {
			document.location.replace('/dashboard');
		} else {
			alert('Failed to delete blog');
		}
	}
};
document
    .querySelector('.new-blog-form')
    .addEventListener('submit', dashboardFormHandler);

    document
	.querySelector('.blog-list')
	.addEventListener('click', delButtonHandler);