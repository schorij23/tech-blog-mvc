const commentFormHandler = async function (event) {
	event.preventDefault();
	// Get the blog_id from the custom dataset attribute of the form
	const blog_id = document.querySelector('.new-comment-form').dataset.blogid;
	// Get the comment description from the input field and trim any extra whitespace
	const comment_description = document.querySelector('#comment_description').value.trim();

	if (comment_description) {
		// Send a POST request to the '/api/comments' endpoint with the comment data
		await fetch('/api/comments', {
			method: 'POST',
			body: JSON.stringify({
				blog_id,
				comment_description,
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		// Reload the document after successfully submitting the comment
		document.location.reload();
	}
};

document
	.querySelector('.new-comment-form')
	.addEventListener('submit', commentFormHandler);