document.getElementById('daftar').addEventListener('submit', function(event) {
    event.preventDefault(); 


    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    if (password.length < 8) {
        document.getElementById('pesan').innerText = 'Password minimal 8 karakter!!';
        return;
    }

    localStorage.setItem('username', username);
    localStorage.setItem('password', password);

  
    document.getElementById('pesan').innerText = 'Pendaftaran berhasil! Silakan login.';


    setTimeout(function() {
        window.location.href = 'Login.html';
    }, 2000);
});