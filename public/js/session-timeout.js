// session-timeout.js

document.addEventListener('DOMContentLoaded', function () {
    console.log('Script loaded.'); // Check if the script is loaded

    let idleTime = 0;
    const idleInterval = 60000; // Set the idle time in milliseconds (e.g., 1 minute)
    let promptShown = false; // Variable to track if the prompt has been shown

    // Increment the idle time every minute
    setInterval(function () {
        timerIncrement();
        console.log('Idle time:', idleTime); // Check the idle time in the console
    }, idleInterval);

    // Reset the idle time on any user activity
    document.addEventListener('mousemove', function () {
        resetIdleTime();
        console.log('Mouse moved.'); // Check if mouse movement is detected
    });

    document.addEventListener('keydown', function () {
        resetIdleTime();
        console.log('Key pressed.'); // Check if a key is pressed
    });

    function timerIncrement() {
        idleTime += 1;
        if (idleTime >= 1 && !promptShown) {
            // Set the idle threshold (e.g., 5 minutes) and check if the prompt has not been shown
            // Show a modal prompt on the page
            showLoginModal();
            console.log('Prompt shown.'); // Check if the prompt is shown
            promptShown = true; // Set the variable to true after showing the prompt
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
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            Your session is about to expire. Please log in to continue.
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onclick="resetPrompt()">Log In</button>
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
