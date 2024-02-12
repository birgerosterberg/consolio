function simulateEnter() {
    const event = new KeyboardEvent('keydown', {
        key: 'Enter'
    });
    document.dispatchEvent(event);
}

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
            { text: "<button class='animate-spin' disabled>~</button> Welcome to iamBiOS <button class='animate-spin' disabled>~</button>", className: "text-xl lg:text-3xl font-bold text-white mb-2" },
            { text: "Portfolio by Birger Österberg", className: "font-bold mb-2" },
            { text: "Version 1.1", className: "font-bold mb-2" },
            { text: "Webserver Running nginx 1.25 @ 10GBit.", className: "font-bold mb-2" },
            { text: "Patience Test:", className: "font-bold mb-2" },
            { text: "Take a moment and relax<span class='animate-[pulse_2s_ease-in-out_infinite] font-extrabold text-3xl'>.</span>", className: "pl-3 xl:pl-8 font-bold mb-2" },
            { text: "Take a deep breath... Breathe out<span class='animate-[pulse_4s_ease-in-out_infinite] font-extrabold text-3xl'>.</span>", className: "pl-3 xl:pl-8 font-bold mb-2" },
            { text: "A Look and Feel, iamBiOS Experience.", className: "font-bold pt-8 mb-2"},
            { text: "Best enjoyed as a Desktop Experience.", className: "font-bold mb-2"},
            { text: "Copyright (C) 2024, iamBiOS.",  className: "font-bold mb-2"},
            { text: "Press <button onclick='simulateEnter()' class='underline text-base hover:opacity-70 sm:text-2xl'>ENTER</button> to open TERMINAL", className: "font-bold mt-auto mb-2" },
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
            }, index * 500); // Delay each line by 1.8 seconds
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
                }, 3000); // Delay for 3 seconds before showing terminal
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
        'cv.txt': `
                    <div class="file-content pl-4">
                        <h1 class="text-gray-200 text-sm sm:text-lg mb-2">Birger Österberg</h1>
                        <h2 class="text-gray-300 text-xs sm:text-base mb-2">Summary</h2>
                        <p class="text-gray-400 text-xs sm:text-base pl-4 mb-4">Fullstack Web Developer and Cybersecurity Developer, skilled in frontend and backend development, Linux and Windows server management, Azure and AWS cloud management. Versatile in Python, JavaScript, HTML/CSS, React, Django, and more.</p>
                        
                        <h2 class="text-gray-300 text-xs sm:text-base mb-2">Education</h2>
                        <ul class="text-gray-400 pl-4 text-xs sm:text-base mb-4">
                            <li>RedCross Community College, Sustainable Leadership, 2016-2017</li>
                            <li>Sundsgården Community College, Front-end Developer, 2022-2023</li>
                            <li>CodeInstitute, Diploma in Fullstack Software Development 2023-2024</li>
                            <li>EC-Utbildning, IT-Cybersecurity Developer 2023-2025</li>
                        </ul>
                                    
                        <h2 class="text-gray-300 text-xs sm:text-base mb-2">Skills</h2>
                        <ul class="text-gray-400 pl-4 text-xs sm:text-base mb-4">
                            <li>Programming Languages: JavaScript, Python, Shell Scripting</li>
                            <li>Web Development: HTML, S/CSS, React, Django</li>
                            <li>Database Management: SQL, postgreSQL</li>
                            <li>Cybersecurity: Encryption, Authentication, Penetration Testing, Securing Operating Systems, Threat Management, Bug Bounty</li>
                        </ul>

                    </div>
                `,
                'portfolio.txt': `
                <div class="file-content pl-4">
                    <h1 class="text-gray-200 text-sm sm:text-lg mb-2">My Portfolio Projects</h1>
                    <ul class="text-gray-400 pl-4 text-xs sm:text-base mb-4">
                        <li style="margin-bottom: 16px;">
                            <div style="margin-bottom: 4px;">
                                <a href="https://github.com/birgerosterberg/thechobanalgorithm" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:underline">The Choban Algorithm</a>
                            </div>
                            <div>Fully Responsive pure HTML / CSS project.</div>
                        </li>
                        <li style="margin-bottom: 16px;">
                            <div style="margin-bottom: 4px;">
                                <a href="https://github.com/birgerosterberg/groovebox" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:underline">The GrooveBox</a>
                            </div>
                            <div>Inspiring GrooveBox made with Vanilla JavaScript and HTML / CSS.</div>
                        </li>
                        <li style="margin-bottom: 16px;">
                            <div style="margin-bottom: 4px;">
                                <a href="https://github.com/birgerosterberg/riddleme" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:underline">Riddle Me</a>
                            </div>
                            <div>Basic Python terminal project.</div>
                        </li>
                        <li style="margin-bottom: 16px;">
                            <div style="margin-bottom: 4px;">
                                <a href="https://github.com/birgerosterberg/loopit" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:underline">Loop It!</a>
                            </div>
                            <div>Fullstack Python Django project with JavaScript, postgreSQL, Bootstrap and JQuery. Community platform</div>
                        </li>
                        <li style="margin-bottom: 16px;">
                            <div style="margin-bottom: 4px;">
                                <a href="https://github.com/birgerosterberg/thebazaar" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:underline">Sanda Bazaar</a>
                            </div>
                            <div>Fullstack Python Django Ecommerce website, with Stripe, postgreSQL, Bootstrap, JavaScript and JQuery.</div>
                        </li>

                    </ul>
                </div>
            `,
            'contact.txt': `
                        <div class="file-content pl-4">
                            <h1 class="text-gray-200 text-sm sm:text-lg mb-2">Contact Information</h1>
                            <ul class="text-gray-400 pl-4 text-xs sm:text-base mb-4">
                                <li class="mb-4">
                                    <div class="mb-1">
                                        <a href="https://www.linkedin.com/in/birger-österberg-iambios" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:underline">LinkedIn Profile</a>
                                    </div>
                                    <div class="text-gray-500">Connect on Linkedin!</div>
                                </li>
                                <li class="mb-4">
                                    <div class="mb-1">
                                        <a href="https://github.com/birgerosterberg" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:underline">GitHub Profile</a>
                                    </div>
                                    <div class="text-gray-500">Connect on GitHub lets Co-Create something fun!</div>
                                </li>
                                <li class="mb-4">
                                    <div class="mb-1">
                                        <a href="mailto:birger@iambios.com" class="text-blue-500 hover:underline">Email: birger@iambios.com</a>
                                    </div>
                                    <div class="text-gray-500">Send me an email if you have any questions!</div>
                                </li>
                            </ul>
                        </div>
                    `,

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
        addLineToTerminal("I am a full-stack web developer and cybersecurity developer.");
        addLineToTerminal("This is a scaled-down terminal with a few available commands.");
        addLineToTerminal("To use this terminal, simply enter your command on the line marked with a > sign.");
        addLineToTerminal("Type the command 'man' and press enter to see the list of available commands through the manual.");
    }

    // Function to handle the ls command
    function listFiles() {
        const files = Object.keys(fileSystem);
        files.forEach(file => {
            const fileLine = document.createElement("div");
            fileLine.classList.add("pl-4", "text-gray-400", "text-xs", "sm:text-base"); // Add left padding
            fileLine.textContent = file;
            terminalBody.appendChild(fileLine); // Append directly to terminal body
        });
        scrollToBottom(); // Ensure scrolling to the bottom after adding all files
    }

    // Function to handle the cat command
    function viewFile(filename) {
        if (fileSystem.hasOwnProperty(filename)) {
            const fileContent = fileSystem[filename];
            const fileContainer = document.createElement("div");
            fileContainer.innerHTML = fileContent.trim(); // Trim to remove extra spaces
            fileContainer.querySelectorAll("ul").forEach(ul => {
                ul.classList.add("pl-4", "text-gray-400", "text-xs", "sm:text-base"); // Add left padding to each ul
            });
            terminalBody.appendChild(fileContainer); // Append file content to terminal body
            scrollToBottom(); // Scroll to the bottom after appending file content
        } else {
            addLineToTerminal(`Error: '${filename}' not found.`);
        }
    }

    // Event listener for Enter key press
    inputField.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            const command = inputField.value.trim();

            // Display the command in the terminal body
            addLineToTerminal(`> ${command}`);

            // Clear the input field
            inputField.value = '';

            // Check if the command is a valid command
            if (command.toLowerCase() === 'clear') {
                clearTerminal();
            } else if (command.toLowerCase() === 'man') {
                // Display help message
                addLineToTerminal("Available commands:");
                addLineToTerminal("- clear: Clear the terminal");
                addLineToTerminal("- man: Display the manual for the Terminal");
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
                addLineToTerminal(`Error: '${command}' is not a valid command. Type 'man' for available commands.`);
            }
        }
    });

    // Call the function to display the greeting message
    displayGreeting();
});