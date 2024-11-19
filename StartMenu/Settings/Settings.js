    // Get elements
    const paddleSpeedSlider = document.getElementById('paddle-speed');
    const ballSpeedSlider = document.getElementById('ball-speed');
    const difficultySelect = document.getElementById('difficulty');
    const soundToggle = document.getElementById('sound-toggle');
    const controlMethodSelect = document.getElementById('control-method');
    const paddleSpeedValue = document.getElementById('paddle-speed-value');
    const ballSpeedValue = document.getElementById('ball-speed-value');
    const soundStatus = document.getElementById('sound-status');

    // Update display values for paddle speed and ball speed sliders
    paddleSpeedSlider.addEventListener('input', () => {
        paddleSpeedValue.textContent = paddleSpeedSlider.value;
    });

    ballSpeedSlider.addEventListener('input', () => {
        ballSpeedValue.textContent = ballSpeedSlider.value;
    });

    // Apply settings function
    function applySettings() {
        const settings = {
            difficulty: difficultySelect.value,
            paddleSpeed: paddleSpeedSlider.value,
            ballSpeed: ballSpeedSlider.value,
            sound: soundToggle.checked,
            controlMethod: controlMethodSelect.value
        };

        // Log settings to console (for now, replace with game logic)
        console.log("Settings applied:", settings);

        // Toggle sound status display
        soundStatus.textContent = soundToggle.checked ? "On" : "Off";

        // You could also store the settings or directly apply them in the game code
        // localStorage.setItem("pongSettings", JSON.stringify(settings));
    }