const dashboardFormHandler = async (event) =>{
    event.preventDefault();

    const title = document.querySelector('#blog-title').value.trim();
    const content = document.querySelector('#blog-content').value.trim();

    if (title && content) {

    try {
        const response = await fetch(`/api/blogs`, {
			method: 'POST',
			body: JSON.stringify({ title, content }),
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
    .querySelector('.blog-form')
    .addEventListener('submit', dashboardFormHandler);

    document
	.querySelector('.blog-list')
	.addEventListener('click', delButtonHandler);