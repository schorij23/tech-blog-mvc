const dashboardFormHandler = async (event) =>{
    event.preventDefault();

    const title = document.querySelector('#blog-title').value.trim();
    const description = document.querySelector('#blog-desc').value.trim();

    if (title && description) {

    try {
        const response = await fetch(`/api/blogs`, {
			method: 'POST',
			body: JSON.stringify({ title, description }),
			headers: {
				'Content-Type': 'application/json',},
        
    }) 
    document.location.replace('/dashboard');

         }catch (error) {
            console.log(error);
            alert('Failed to create the blog')
    
        // if (response.ok) {
        //     document.location.replace('/dashboard');
        // } else {
        //     alert('Failed to create the blog');
        };
    }
}

const delButtonHandler = async (event) => {
	if (event.target.hasAttribute('data-id')) {
		const id = event.target.getAttribute('data-id');

		const response = await fetch(`/api/blogs/${id}`, {
			method: 'DELETE',
		});

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