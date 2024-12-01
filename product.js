let slideindex = 0;
tampilkanSlide();

function tampilkanSlide() {
    let slides = document.getElementsByClassName('slide');

    // Menghapus kelas "show" dari semua slide
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove("show");
    }

    slideindex++;
    // Jika slideindex lebih besar dari jumlah slide, reset ke 0
    if (slideindex >= slides.length) {
        slideindex = 0;
    }
    
    // Menambahkan kelas "show" pada slide yang sesuai
    slides[slideindex].classList.add("show");
    setTimeout(tampilkanSlide, 3000); 
}