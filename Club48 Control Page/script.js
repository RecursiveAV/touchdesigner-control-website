let ws = new WebSocket('wss://test-server-app.herokuapp.com:443');

        ws.onopen = () => {
            console.log('WebSocket connection established.');
        };

        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
            alert('Error: Unable to connect to server.');
        };

        ws.onmessage = (message) => {
            const data = JSON.parse(message.data);

            if (data["LVBD_Confirmed_Door"] === "1") {
                const button = document.querySelector('.door');
                if (button) {
                    button.style.backgroundColor = '#3de83a'; // Turn green
                    button.classList.add('locked'); // Lock the button
                    button.disabled = true; // Disable further clicks

                    // Revert after 5 seconds
                    setTimeout(() => {
                        button.style.backgroundColor = '';
                        button.classList.remove('locked');
                        button.disabled = false;
                    }, 5000);
                }
            }

            if (data["LVBD_Confirmed_Vault"] === "1") {
                const button = document.querySelector('.vault');
                if (button) {
                    button.style.backgroundColor = '#3de83a'; // Turn green
                    button.classList.add('locked'); // Lock the button
                    button.disabled = true; // Disable further clicks

                    // Revert after 5 seconds
                    setTimeout(() => {
                        button.style.backgroundColor = '';
                        button.classList.remove('locked');
                        button.disabled = false;
                    }, 5000);
                }
            }

            if (data["LVBD_Confirmed_Wall"] === "1") {
                const button = document.querySelector('.wall');
                if (button) {
                    button.style.backgroundColor = '#3de83a'; // Turn green
                    button.classList.add('locked'); // Lock the button
                    button.disabled = true; // Disable further clicks

                    // Revert after 5 seconds
                    setTimeout(() => {
                        button.style.backgroundColor = '';
                        button.classList.remove('locked');
                        button.disabled = false;
                    }, 5000);
                }
            }
        };

        function sendCommand(command, buttonClass) {
            const button = document.querySelector(`.${buttonClass}`);

            // Provide immediate feedback that button was pressed
            button.style.transform = "scale(0.95)";
            setTimeout(() => button.style.transform = "", 100);

            try {
                ws.send(JSON.stringify({ command }));
            } catch (error) {
                alert('Error: Unable to send command to server.');
                console.error(error);
            }
        }