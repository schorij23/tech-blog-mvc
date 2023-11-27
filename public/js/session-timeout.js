document.addEventListener('DOMContentLoaded', function () {
    // Check if the script is loaded
    console.log('Script loaded.');

    let idleTime = 0;
     // Set the idle time in milliseconds (60000 = 1 minute)
    const idleInterval = 6000;
     // Variable to track if the prompt has been shown
    let promptShown = false;

    // Increment and check the idle time 
    setInterval(function () {
        timerIncrement();
        console.log('Idle time:', idleTime);
    }, idleInterval);

    // Reset the idle time check for mouse movement
    document.addEventListener('mousemove', function () {
        resetIdleTime();
        console.log('Mouse moved.');
    });
    // Reset the idle time check for key press
    document.addEventListener('keydown', function () {
        resetIdleTime();
        console.log('Key pressed.');
    });
    // Set idel time ahnd check if prompt is not shown
    function timerIncrement() {
        idleTime += 1;
        if (idleTime >= 1 && !promptShown) {
            // Show a modal prompt on the page
            showLoginModal();
            // Check if the prompt is shown
            console.log('Prompt shown.');
            // Set the variable to true after showing the prompt
            promptShown = true;
        }
    }

    function resetIdleTime() {
        idleTime = 0;
    }

    function showLoginModal() {
        // Create a modal element
        const modalElement = document.createElement('div');
        modalElement.innerHTML = `
            <div class="modal fade" id="loginModal" tabindex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="loginModalLabel">Session Timeout</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onclick="resetPrompt()"></button>
                        </div>
                        <div class="modal-body">
                            Please log to add, update, or delete posts
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onclick="resetPrompt()">Please Log In</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Append the modal element to the body
        document.body.appendChild(modalElement);

        // Activate the Bootstrap modal
        const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
        loginModal.show();
    }

    // Function to reset the promptShown variable when the user dismisses the modal
    window.resetPrompt = function () {
        promptShown = false;
    };
});
