// माइनिंग का गणित (0.10 $SHRI/hr, 8 घंटे का चक्र)
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

// बटन क्लिक इवेंट
miningBtn.addEventListener('click', startMiningSession);

function startMiningSession() {
    if (isMining) return; // पहले से चल रहा है तो कुछ न करें

    isMining = true;
    miningBtn.classList.add('active'); // चमकने वाला एनीमेशन शुरू
    statusEl.innerText = "Mining Active";
    
    let startTime = Date.now();
    let endTime = startTime + (sessionDurationHours * 60 * 60 * 1000);

    // 1. हर सेकंड कॉइन्स बढ़ाना (Pi style counter)
    miningInterval = setInterval(() => {
        balance += ratePerSecond;
        balanceEl.innerText = balance.toFixed(4); // 4 डेसिमल तक दिखाना
        
        // 2. टाइमर अपडेट करना
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
    miningBtn.classList.remove('active'); // एनीमेशन बंद
    statusEl.innerText = "Mining Session Ended. Tap to Restart.";
    timerEl.innerText = "";
}

function updateTimerDisplay(ms) {
    let hours = Math.floor(ms / (1000 * 60 * 60));
    let minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((ms % (1000 * 60)) / 1000);
    
    // फॉर्मेट: 07:59:59
    timerEl.innerText = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}
