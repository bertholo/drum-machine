document.addEventListener('DOMContentLoaded', function () {
    const powerButton = document.getElementById("power");
    const pads = document.querySelectorAll('.drum-pad');
    const display = document.getElementById("controls-display");
    const volumeControl = document.getElementById("volume-control");
    const volumeDisplay = document.getElementById("volume-display");

    const sounds = {
        Q: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-1.mp3",
        W: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-2.mp3",
        E: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-3.mp3",
        A: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-4_1.mp3",
        S: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-6.mp3",
        D: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Dsc_Oh.mp3",
        Z: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Kick_n_Hat.mp3",
        X: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/RP4_KICK_1.mp3",
        C: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Cev_H2.mp3"
    };

    let isPowerOn = true;

    function togglePower() {
        isPowerOn = !isPowerOn;
        powerButton.classList.toggle('active', isPowerOn);

        if (isPowerOn) {
            pads.forEach(pad => {
                pad.addEventListener('click', handlePadClick);
            });

            document.addEventListener("keydown", handleKeyPress);
            document.addEventListener("input", handleVolumeChange);

            volumeDisplay.textContent = (volumeControl.value * 100).toFixed(0);
            display.innerText = 'Ready';
        } else {
            pads.forEach(pad => {
                pad.removeEventListener('click', handlePadClick);
            });

            document.removeEventListener("keydown", handleKeyPress);
            document.removeEventListener("input", handleVolumeChange);

            volumeDisplay.textContent = (volumeControl.value * 100).toFixed(0);
            display.innerText = 'Power Off';
        }
    }

    function handleVolumeChange() {
        if (isPowerOn) {
            document.querySelectorAll('audio').forEach(audio => {
                audio.volume = volumeControl.value;
            });
            volumeDisplay.textContent = (volumeControl.value * 100).toFixed(0);
        }
    }

    function handlePadClick(event) {
        playSound(event.currentTarget.id);
    }

    function handleKeyPress(event) {
        if (sounds[event.key.toUpperCase()]) {
            playSound(event.key.toUpperCase());
        }
    }

    function playSound(key) {
        if (!isPowerOn) return;
        const audio = new Audio(sounds[key]);
        audio.volume = volumeControl.value;
        audio.play();
        display.innerText = `Playing: ${key}`;
    }

    powerButton.addEventListener("click", togglePower);
});
