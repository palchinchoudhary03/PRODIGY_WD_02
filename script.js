document.addEventListener('DOMContentLoaded', function() {
    let startStopButton = document.getElementById('startStop');
    let resetButton = document.getElementById('reset');
    let lapButton = document.getElementById('lap');
    let display = document.querySelector('.display');
    let lapsContainer = document.querySelector('.laps');

    let timer;
    let isRunning = false;
    let startTime = 0;
    let elapsedTime = 0;

    function updateDisplay(time) {
        let hours = Math.floor(time / 3600000);
        let minutes = Math.floor((time % 3600000) / 60000);
        let seconds = Math.floor((time % 60000) / 1000);

        display.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    }

    function pad(number) {
        return number < 10 ? '0' + number : number;
    }

    function startStop() {
        if (isRunning) {
            clearInterval(timer);
            startStopButton.textContent = 'Start';
        } else {
            startTime = Date.now() - elapsedTime;
            timer = setInterval(function() {
                elapsedTime = Date.now() - startTime;
                updateDisplay(elapsedTime);
            }, 100);
            startStopButton.textContent = 'Stop';
        }
        isRunning = !isRunning;
    }

    function reset() {
        clearInterval(timer);
        isRunning = false;
        elapsedTime = 0;
        updateDisplay(0);
        startStopButton.textContent = 'Start';
        lapsContainer.innerHTML = '';
    }

    function lap() {
        if (isRunning) {
            let lapTime = document.createElement('li');
            lapTime.textContent = display.textContent;
            lapsContainer.appendChild(lapTime);
        }
    }

    startStopButton.addEventListener('click', startStop);
    resetButton.addEventListener('click', reset);
    lapButton.addEventListener('click', lap);
});
