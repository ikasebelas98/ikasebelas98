/* ==========================================================
   HERO SLIDER
========================================================== */

const slides = document.querySelectorAll(".hero-slide");

let current = 0;

const duration = 5000;


/* ==========================================================
   CHANGE SLIDE
========================================================== */

function changeSlide(){

    // matikan slide aktif
    slides[current].classList.remove("active");

    // reset animation supaya bisa dimainkan lagi
    const bgOld = slides[current].querySelector(".hero-bg");
    const fgOld = slides[current].querySelector(".hero-foreground");

    bgOld.style.animation = "none";
    fgOld.style.animation = "none";

    // paksa browser repaint
    void bgOld.offsetWidth;
    void fgOld.offsetWidth;

    bgOld.style.animation = "";
    fgOld.style.animation = "";

    // slide berikutnya
    current++;

    if(current >= slides.length){

        current = 0;

    }

    // aktifkan slide baru
    slides[current].classList.add("active");

}

setInterval(changeSlide, duration);