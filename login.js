let attemptCount = 0;
const maxAttempts = 3;
const lockoutTime = 15000;
let isLockedOut = false;

document.getElementById('login').addEventListener('submit', function(event) {
    event.preventDefault();

    if (isLockedOut) {
        document.getElementById('pesan').innerText = 'Silakan coba lagi nanti.';
        return;
    }

    const usernameInput = document.getElementById('username').value;
    const passwordInput = document.getElementById('password').value;

    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');

    if (usernameInput === storedUsername && passwordInput === storedPassword) {
        alert('Login Berhasil!');
        window.location.href = 'index.html';
    } else {
        attemptCount++;
        document.getElementById('pesan').innerText = 'Username atau password salah!';

        if (attemptCount >= maxAttempts) {
            isLockedOut = true;
            document.getElementById('pesan').innerText = 'Terlalu banyak percobaan gagal. Cobalah lagi dalam 15 detik.';
            setTimeout(() => {
                isLockedOut = false;
                attemptCount = 0;
                document.getElementById('pesan').innerText = '';
            }, lockoutTime);
        }
    }
});


function startCountdown(seconds) {
    let timeLeft = seconds;
    document.getElementById('countdown').innerText = `Waktu tersisa: ${timeLeft} detik`;

    countdownTimer = setInterval(() => {
        timeLeft--;
        document.getElementById('countdown').innerText = `Waktu tersisa: ${timeLeft} detik`;

        if (timeLeft <= 0) {
            clearInterval(countdownTimer);
            isLockedOut = false;
            attemptCount = 0;
            document.getElementById('pesan').innerText = '';
            document.getElementById('countdown').innerText = ''; // Hapus tampilan countdown
        }
    }, 1000);
}