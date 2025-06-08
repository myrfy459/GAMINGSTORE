let slideindex = 0;
tampilkanSlide();

function tampilkanSlide() {
    let slides = document.getElementsByClassName('slide');

    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove("show");
    }

    slideindex++;
    
    if (slideindex >= slides.length) {
        slideindex = 0;
    }
    
    slides[slideindex].classList.add("show");
    setTimeout(tampilkanSlide, 2000); 
}