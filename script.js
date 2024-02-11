// Get the terminal body and input field
const terminalBody = document.getElementById('terminal-body');
const inputField = document.getElementById('command-input');

// Show terminal after booting up
setTimeout(() => {
    document.getElementById('boot-up-screen').style.display = 'none';
    document.getElementById('terminal-container').style.display = 'block';
    inputField.focus();
}, 3000);

// Event listener for Enter key press
inputField.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        const command = inputField.value.trim();

        // Display the command in the terminal body
        terminalBody.innerHTML += `<div class="text-gray-400">$ ${command}</div>`;

        // Clear the input field
        inputField.value = '';
    }
});
