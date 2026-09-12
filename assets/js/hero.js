/* ==========================================================
   HERO SLIDER
========================================================== */

document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelectorAll(".hero-slide");
    if (!slides.length) return;

    let current = 0;
    const duration = 4000; // Gambar berpindah setiap 4 Detik (4000ms)

    /* ==========================================================
       CHANGE SLIDE (TRUE CROSSFADE ENGINE)
    ========================================================== */
    function changeSlide() {
        const previousSlide = slides[current];

        // 1. Hitung index slide berikutnya
        current = (current + 1) % slides.length;
        const nextSlide = slides[current];

        // 2. Aktifkan slide baru (Mulai fade-in di atas slide lama)
        nextSlide.classList.add("active");

        // 3. TUNGGU 1.2 Detik (hingga fade-in slide baru selesai 100%),
        //    barulah matikan kelas active slide lama di belakang layar.
        //    Dengan cara ini, animasi zoom 5.2s slide lama tidak pernah terpotong kaget!
        setTimeout(() => {
            previousSlide.classList.remove("active");
        }, 1200);
    }

    // Jalankan interval pergantian slide setiap 4 detik
    setInterval(changeSlide, duration);
});