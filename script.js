document.addEventListener("DOMContentLoaded", function() {
    // Function to create and display boot-up sequence
    function createBootUpSequence() {
        const bootUpContainer = document.createElement("div");
        bootUpContainer.className = "flex flex-col items-start justify-start bg-black text-sm xl:text-lg xl:pl-10 xl:pt-10 2xl:text-2xl 2xl:pl-32 2xl:pt-32 text-gray-400 h-screen w-screen p-2";

        // Logo
        const logoImg = document.createElement("img");
        logoImg.src = "logo.png";
        logoImg.alt = "Logo";
        logoImg.className = "pb-1 md:fixed md:right-0 lg:right-32";
        // Add logo to the container before text
        bootUpContainer.appendChild(logoImg);

        // Text elements with their respective classes
        const bootUpText = [
            { text: "Welcome to iamBiOS v1.1", className: "text-xl lg:text-3xl font-bold text-white mb-2" },
            { text: "Portfolio by Birger Österberg", className: "font-bold mb-2" },
            { text: "Version 1.1", className: "font-bold mb-2" },
            { text: "Webserver Running at 10GBit.", className: "font-bold mb-2" },
            { text: "Patience Test:", className: "font-bold mb-2" },
            { text: "Take a moment and relax", className: "font-bold mb-2" },
            { text: "Take a deep breath... Breathe out.", className: "font-bold mb-2" },
            { text: "Press ENTER to open TERMINAL", className: "font-bold mt-auto mb-2" },
        ];

        const addTextWithDelay = (index) => {
            setTimeout(() => {
                const bootUpElement = document.createElement("div");
                if (bootUpText[index].className.trim() !== "") {
                    bootUpElement.classList.add(...bootUpText[index].className.split(' '));
                }
                bootUpElement.innerHTML = bootUpText[index].text;
                bootUpContainer.appendChild(bootUpElement);
                scrollToBottom();
            }, index * 1800); // Delay each line by 1 second
        };

        for (let i = 0; i < bootUpText.length; i++) {
            addTextWithDelay(i);
        }

        // Add boot-up container to the body
        document.body.appendChild(bootUpContainer);

        // Event listener for Enter key press to remove boot-up sequence and show terminal
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                bootUpContainer.remove();
                const bootScreen = document.createElement("div");
                bootScreen.id = "boot-up-screen";
                bootScreen.className = "flex items-center justify-center h-screen";
                bootScreen.innerHTML = "<div id='boot-up-text' class='text-4xl'>Booting up...</div>";
                document.body.appendChild(bootScreen);
                setTimeout(() => {
                    bootScreen.remove();
                    document.getElementById('terminal-container').style.display = 'block';
                    document.getElementById('command-input').focus();
                }, 3000);
            }
        });
    }

    // Call function to create boot-up sequence
    createBootUpSequence();

    // Get the terminal body and input field
    const terminalBody = document.getElementById('terminal-body');
    const inputField = document.getElementById('command-input');

    // Simulated file system
    const fileSystem = {
        'file1.txt': 'Content of file1.txt...',
        'file2.txt': 'Content of file2.txt...',
        'file3.txt': 'Content of file3.txt...',
        'cv.txt': 'Content of cv.txt...',
    };

    // Function to add a line of text to the terminal
    function addLineToTerminal(text) {
        const newLine = document.createElement("div");
        newLine.classList.add("text-gray-400", "text-xs", "sm:text-base");
        newLine.textContent = text;
        terminalBody.appendChild(newLine);
        scrollToBottom();
    }

    // Function to clear the terminal body
    function clearTerminal() {
        terminalBody.innerHTML = '';
    }

    // Function to scroll to the bottom of the terminal body
    function scrollToBottom() {
        terminalBody.scrollTop = terminalBody.scrollHeight;
    }

    // Function to display the greeting message in the terminal
    function displayGreeting() {
        addLineToTerminal("Welcome to the portfolio of Birger Österberg.");
        addLineToTerminal("Fullstack web developer and Cybersecurity Developer.");
        addLineToTerminal("This is a scaled down terminal with a few commands that work.");
        addLineToTerminal("Use 'ls' to list files and 'cat <filename>' to view them.");
    }

    // Function to handle the ls command
    function listFiles() {
        const files = Object.keys(fileSystem);
        addLineToTerminal(files.join(' '));
    }

    // Function to handle the cat command
    function viewFile(filename) {
        if (fileSystem.hasOwnProperty(filename)) {
            addLineToTerminal(fileSystem[filename]);
        } else {
            addLineToTerminal(`Error: '${filename}' not found.`);
        }
    }

    // Event listener for Enter key press
    inputField.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            const command = inputField.value.trim();

            // Display the command in the terminal body
            addLineToTerminal(`$ ${command}`);

            // Clear the input field
            inputField.value = '';

            // Check if the command is a valid command
            if (command.toLowerCase() === 'clear') {
                clearTerminal();
            } else if (command.toLowerCase() === 'help') {
                // Display help message
                addLineToTerminal("Available commands:");
                addLineToTerminal("- clear: Clear the terminal");
                addLineToTerminal("- help: Display this help message");
                addLineToTerminal("- ls: List files");
                addLineToTerminal("- cat <filename>: View file content");
            } else if (command.toLowerCase() === 'ls') {
                listFiles();
            } else if (command.toLowerCase().startsWith('cat')) {
                const filename = command.split(' ')[1];
                if (filename) {
                    viewFile(filename);
                } else {
                    addLineToTerminal("Error: Please specify a filename after 'cat'.");
                }
            } else {
                // Display error message for unknown command
                addLineToTerminal(`Error: '${command}' is not a valid command. Type 'help' for available commands.`);
            }
        }
    });

    // Call the function to display the greeting message
    displayGreeting();
});
