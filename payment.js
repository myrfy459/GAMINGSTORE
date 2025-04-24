
let countdownTime = 100; 


const timerDisplay = document.getElementById('timer');
const payButton = document.getElementById('pay-button');

function updateTimer() {
    if (countdownTime > 0) {
        timerDisplay.textContent = `Waktu tersisa: ${countdownTime} detik`;
        countdownTime--;
    } else {
        clearInterval(timerInterval);
        timerDisplay.textContent = "Waktu habis!";
        payButton.disabled = true;
        window.location.href = "Laptop.html"; 
    }
}


const timerInterval = setInterval(updateTimer, 1000);

document.getElementById('payment-form').addEventListener('submit', function(event) {
    event.preventDefault(); 
    alert("Pembayaran diproses!"); 
    window.location.href = "Terimakasih.html";
    
}); 

updateTimer();