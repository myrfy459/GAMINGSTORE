const videoElement = document.getElementById('myVideo');

const startTime = 50;  
const endTime = 58;  


videoElement.addEventListener('loadedmetadata', function() {
    videoElement.currentTime = startTime;  
    videoElement.play();                 
});


videoElement.addEventListener('timeupdate', function() {
  
    if (videoElement.currentTime >= endTime) {
        videoElement.currentTime = startTime; 
        videoElement.play();                 
    }
});

const videos = [
    'file:///D:/X%20PPLG%202/DPK%20B/video/2023%20ROG%20Strix%20G16-18%20-%20RAISE%20YOUR%20GAME.%20CARRY%20YOUR%20SQUAD.%20%20_%20ROG.mp4',
    'file:///D:/X%20PPLG%202/DPK%20B/video/GeForce%20RTX%20-%20Graphics%20Reinvented.mp4'
];

let videoPlayer = document.getElementById('myVideo');
let videoIndex = 0; 


function changeVideo() {
   
    videoIndex++;

    
    if (videoIndex >= videos.length) {
        videoIndex = 0;
    }

   
    videoPlayer.src = videos[videoIndex];
    videoPlayer.play(); 
}


videoPlayer.addEventListener('ended', changeVideo);

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show'); // Tambahkan kelas 'show' saat elemen masuk viewport
        } else {
            entry.target.classList.remove('show'); // Hapus kelas 'show' saat elemen keluar dari viewport
        }
    });
});

// Mendaftarkan semua elemen dengan kelas 'zoom-content' untuk diobservasi
document.querySelectorAll('.gambar-content').forEach((element) => {
    observer.observe(element);
});

function toggleCart() {
    const cartPopup = document.getElementById('cartPopup');
    cartPopup.classList.toggle('active');
}



