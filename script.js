let balance = 0.0000;
const baseRatePerHour = 0.10;
const ratePerSecond = baseRatePerHour / 3600;
let miningInterval;
let isMining = false;
const sessionDurationHours = 8;

const balanceEl = document.getElementById('balance');
const miningBtn = document.getElementById('miningBtn');
const statusEl = document.getElementById('status');
const timerEl = document.getElementById('timer');

miningBtn.addEventListener('click', startMiningSession);

function startMiningSession() {
    if (isMining) return;

    isMining = true;
    miningBtn.classList.add('active');
    statusEl.innerText = "Mining Active";
    
    let startTime = Date.now();
    let endTime = startTime + (sessionDurationHours * 60 * 60 * 1000);

    miningInterval = setInterval(() => {
        balance += ratePerSecond;
        balanceEl.innerText = balance.toFixed(4);
        
        let now = Date.now();
        let remaining = endTime - now;
        
        if (remaining <= 0) {
            stopMiningSession();
        } else {
            updateTimerDisplay(remaining);
        }
    }, 1000);
}

function stopMiningSession() {
    isMining = false;
    clearInterval(miningInterval);
    miningBtn.classList.remove('active');
    statusEl.innerText = "Mining Session Ended. Tap to Restart.";
    timerEl.innerText = "";
}

function updateTimerDisplay(ms) {
    let hours = Math.floor(ms / (1000 * 60 * 60));
    let minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((ms % (1000 * 60)) / 1000);
    
    timerEl.innerText = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}
