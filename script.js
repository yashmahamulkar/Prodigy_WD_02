window.onload = function () {
    let min = 0;
    let sec = 0;
    let milisec = 0;
    let laps = [];
    let lapCount = 1;
    let rotationValue = 0; 
    let appendMin = document.querySelector("#min");
    let appendSec = document.querySelector("#sec");
    let appendMilisec = document.querySelector("#milisec");
    let lapsDiv = document.querySelector(".laps");
    let startBtn = document.querySelector("#start");
    let stopBtn = document.querySelector("#stop");
    let resetBtn = document.querySelector("#reset");
    let lapBtn = document.querySelector("#lap");
    let watchProgress = document.querySelector(".progress");
    let interval; 

    const startTimer = () => {
        milisec++;
        if (milisec <= 9) {
            appendMilisec.innerHTML = '0' + milisec;
        }
        if (milisec > 9) {
            appendMilisec.innerHTML = milisec;
        }

        if (milisec > 99) {
            sec++;
            appendSec.innerHTML = sec <= 9 ? '0' + sec : sec;
            milisec = 0;
            appendMilisec.innerHTML = '00';
        }
        if (sec > 59) {
            min++;
            appendMin.innerHTML = min <= 9 ? '0' + min : min;
            sec = 0;
            appendSec.innerHTML = '00';
        }

        rotationValue += 0.01666666;
        watchProgress.style.transform = `rotate(${rotationValue}deg)`;
    };

    startBtn.onclick = () => {
        clearInterval(interval);
        interval = setInterval(startTimer, 10);
        watchProgress.style.animationPlayState = 'running';
    };

    stopBtn.onclick = () => {
        clearInterval(interval);
        watchProgress.style.animationPlayState = 'paused';
    };

    resetBtn.onclick = () => {
        clearInterval(interval);
        milisec = 0;
        sec = 0;
        min = 0;
        
        rotationValue =0; 
        watchProgress.style.animation = 'none';
        watchProgress.style.transform = `rotate(${rotationValue}deg)`;

        watchProgress.style.animationPlayState = 'initial';
       
        appendMin.innerHTML = '00';
        appendSec.innerHTML = '00';
        appendMilisec.innerHTML = '00';
        laps = [];
        lapCount = 1;
        lapsDiv.innerHTML = ''; 
        watchProgress.style.animationPlayState = 'paused';
    };

    lapBtn.onclick = () => {
        laps.push({
            lap: lapCount,
            minutes: min <= 9 ? '0' + min : min,
            seconds: sec <= 9 ? '0' + sec : sec,
            milliseconds: milisec <= 9 ? '0' + milisec : milisec
        });

        displayLaps();
        lapCount++;
    };

    const displayLaps = () => {
        lapsDiv.innerHTML = '';
        laps.forEach((lap) => {
            const lapEntry = document.createElement('div');
            lapEntry.textContent = `Lap ${lap.lap}: ${lap.minutes}:${lap.seconds}:${lap.milliseconds}`;
            lapsDiv.appendChild(lapEntry);
        });
    };
};
