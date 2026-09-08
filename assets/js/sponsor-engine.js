/* ==========================================
   SPONSOR ENGINE (SYMMETRIC LEFT & RIGHT FLIP + AUTOPLAY)
   - Fixed Container Height based on 9:16 ratio (prevents page jump)
   - Dynamic Aspect Ratio Support (16:9, 1:1, 9:16)
   - Absolute Scroll Lock (No Page Jump)
   - Auto-advance: Video (1x Play / Ended), Image (8s)
   - Auto-pause when section is not visible in viewport
========================================== */

const sponsorTrack = document.querySelector(".sponsor-track");
const sponsorSection = document.querySelector(".sponsor-slider");

const LEFT_COUNT = 5;
const RIGHT_COUNT = 5;

// PATOKAN UTAMA: Dikunci berdasarkan tinggi maksimum video 9:16 (568px)
const MAX_9_16_HEIGHT = 568; 

// Konfigurasi Durasi & Easing Morphing
const MORPH_DURATION = "1.8s";
const MORPH_EASING = "cubic-bezier(0.05, 0.7, 0.1, 1)";
const IMAGE_AUTO_DURATION = 8000; // 8 Detik untuk gambar

const SLOT_CLASSES = [
    "slot-xs", "slot-s", "slot-m", "slot-l", "slot-xl",
    "", // Indeks 5: Item Aktif
    "slot-xl", "slot-l", "slot-m", "slot-s", "slot-xs"
];

// Array Utama Mengunci Urutan Data Asli Sponsor
let masterSponsorList = [];
let imageTimer = null;
let isSectionVisible = false;

// 1. Fungsi Mendapatkan Aspect Ratio Media
function getMediaRatio(viewport) {
    const media = viewport.querySelector("img, video");
    if (!media) return 16 / 9;

    if (media.tagName === "IMG" && media.naturalWidth) {
        return media.naturalWidth / media.naturalHeight;
    }

    if (media.tagName === "VIDEO" && media.videoWidth && media.videoHeight) {
        return media.videoWidth / media.videoHeight;
    }

    const fallbackRatio = viewport.dataset.ratio;
    if (fallbackRatio === "16:9") return 16 / 9;
    if (fallbackRatio === "9:16") return 9 / 16;
    if (fallbackRatio === "1:1") return 1;

    return 16 / 9;
}

// 2. Fungsi Utama Rotasi & FLIP Morphing Simetris (Kiri & Kanan)
function setActiveCenter(targetViewport) {
    if (!targetViewport) return;

    clearAutoAdvanceTimer();

    const currentDomItems = Array.from(sponsorTrack.querySelectorAll(".sponsor-viewport"));
    const targetIndex = currentDomItems.indexOf(targetViewport);

    if (targetIndex === -1) return;

    const total = currentDomItems.length;

    // STEP 1: FIRST - Rekam Posisi Pusat Fisik (Center X) Seluruh Thumbnail Tepat Sebelum Dirotasi
    const firstCenters = new Map();
    currentDomItems.forEach((vp) => {
        const rect = vp.getBoundingClientRect();
        firstCenters.set(vp, rect.left + rect.width / 2);
    });

    // STEP 2: Susun Ulang Array Secara Simetris (Kiri-Tengah-Kanan)
    const reorderedItems = [];
    for (let i = LEFT_COUNT; i >= 1; i--) {
        const idx = (targetIndex - i + total) % total;
        reorderedItems.push(currentDomItems[idx]);
    }
    reorderedItems.push(targetViewport);
    for (let i = 1; i <= RIGHT_COUNT; i++) {
        const idx = (targetIndex + i) % total;
        reorderedItems.push(currentDomItems[idx]);
    }

    // Matikan Transisi CSS Sementara Untuk Penataan Ulang DOM
    reorderedItems.forEach((vp) => {
        vp.style.transition = "none";
    });

    // Pindahkan Elemen Di DOM Sesuai Urutan Baru
    sponsorTrack.innerHTML = "";
    reorderedItems.forEach((item) => sponsorTrack.appendChild(item));

    // Update Ukuran Visual, Pagination, & Slot
    updateSliderVisuals(targetViewport, reorderedItems);
    updatePagination(targetViewport);

    // FORCE REFLOW 1: Memaksa Browser Memproses Layout Baru Secara Instan
    void sponsorTrack.offsetHeight;

    // STEP 3: INVERT - Hitung Selisih Pusat Fisik (First Center vs Last Center)
    reorderedItems.forEach((vp) => {
        const firstCenter = firstCenters.get(vp);
        if (firstCenter !== undefined) {
            const lastRect = vp.getBoundingClientRect();
            const lastCenter = lastRect.left + lastRect.width / 2;

            const deltaX = firstCenter - lastCenter;
            vp.style.transform = `translateX(${deltaX}px)`;
        }
    });

    // FORCE REFLOW 2: Mengunci Titik Awal Transformasi
    void sponsorTrack.offsetHeight;

    // STEP 4: PLAY - Hidupkan Transisi dan Kembalikan Ke Transformasi Normal (0)
    requestAnimationFrame(() => {
        reorderedItems.forEach((vp) => {
            vp.style.transition = `transform ${MORPH_DURATION} ${MORPH_EASING}, width ${MORPH_DURATION} ${MORPH_EASING}, height ${MORPH_DURATION} ${MORPH_EASING}, opacity ${MORPH_DURATION} ${MORPH_EASING}`;
            vp.style.transform = "translateX(0)";
        });
    });

    // Jalankan Auto-Advance Timer Sesuai Tipe Media Aktif
    handleAutoAdvance(targetViewport);
}

// 3. Fungsi Menghitung Dimensi Visual Berdasarkan Patokan Tinggi 9:16
function updateSliderVisuals(activeTarget, reorderedItems) {
    reorderedItems.forEach((vp, index) => {
        const media = vp.querySelector("img, video");
        const isVideo = media && media.tagName === "VIDEO";

        vp.classList.remove("slot-xs", "slot-s", "slot-m", "slot-l", "slot-xl", "is-active");
        
        vp.style.width = "";
        vp.style.height = "";

        if (vp === activeTarget) {
            vp.classList.add("is-active");

            const ratio = getMediaRatio(vp);

            if (ratio < 0.8) { 
                // Format Portrait (9:16) -> Menggunakan Tinggi Patokan Utama
                const activeHeight = MAX_9_16_HEIGHT;
                vp.style.height = `${activeHeight}px`;
                vp.style.width = `${activeHeight * ratio}px`; // Lebar ~320px

            } else if (Math.abs(ratio - 1) < 0.2) { 
                // Format Square (1:1) -> Mengambil Patokan dari Tinggi 9:16
                const activeSize = MAX_9_16_HEIGHT; 
                vp.style.width = `${activeSize}px`;
                vp.style.height = `${activeSize}px`;

            } else { 
                // Format Landscape (16:9) -> Proporsional
                const activeWidth = 640;
                vp.style.width = `${activeWidth}px`;
                vp.style.height = `${activeWidth / ratio}px`; // Tinggi 360px
            }

            if (isVideo && isSectionVisible) {
                media.currentTime = 0;
                media.play().catch((err) => console.log("Autoplay ditahan browser:", err));
            }
        } else {
            if (isVideo) {
                media.pause();
                media.muted = true;
                const btn = vp.querySelector(".sound-toggle-btn");
                if (btn) btn.textContent = "🔇";
            }

            // Ukuran thumbnail non-aktif di samping
            const inactiveHeight = 200; 
            vp.style.height = `${inactiveHeight}px`;

            const slotClass = SLOT_CLASSES[index];
            if (slotClass) {
                vp.classList.add(slotClass);
            }
        }
    });
}

// 4. Manajemen Auto-Advance (Gambar 8 Detik, Video 1x Play sampai End)
function handleAutoAdvance(activeViewport) {
    if (!isSectionVisible) return;

    const media = activeViewport.querySelector("img, video");

    if (media && media.tagName === "VIDEO") {
        media.onended = null;
        media.onended = () => {
            if (isSectionVisible) nextSlide();
        };
    } else {
        imageTimer = setTimeout(() => {
            if (isSectionVisible) nextSlide();
        }, IMAGE_AUTO_DURATION);
    }
}

function clearAutoAdvanceTimer() {
    if (imageTimer) {
        clearTimeout(imageTimer);
        imageTimer = null;
    }
}

// 5. Fungsi Navigasi Next & Prev
function nextSlide() {
    const currentActive = sponsorTrack.querySelector(".sponsor-viewport.is-active");
    if (!currentActive) return;

    const currentDomItems = Array.from(sponsorTrack.querySelectorAll(".sponsor-viewport"));
    const activeIndex = currentDomItems.indexOf(currentActive);
    const nextIndex = (activeIndex + 1) % currentDomItems.length;

    setActiveCenter(currentDomItems[nextIndex]);
}

function prevSlide() {
    const currentActive = sponsorTrack.querySelector(".sponsor-viewport.is-active");
    if (!currentActive) return;

    const currentDomItems = Array.from(sponsorTrack.querySelectorAll(".sponsor-viewport"));
    const activeIndex = currentDomItems.indexOf(currentActive);
    const prevIndex = (activeIndex - 1 + currentDomItems.length) % currentDomItems.length;

    setActiveCenter(currentDomItems[prevIndex]);
}

// 6. Inisialisasi & Update Pagination Dots
function setupPagination() {
    const paginationContainer = document.querySelector(".sponsor-pagination");
    if (!paginationContainer) return;
    
    paginationContainer.innerHTML = "";

    masterSponsorList.forEach((item) => {
        const dot = document.createElement("div");
        dot.classList.add("sponsor-dot");
        dot.addEventListener("click", () => {
            setActiveCenter(item);
        });
        paginationContainer.appendChild(dot);
    });
}

function updatePagination(activeViewport) {
    const paginationContainer = document.querySelector(".sponsor-pagination");
    if (!paginationContainer) return;

    const dots = paginationContainer.querySelectorAll(".sponsor-dot");
    const activeIndex = masterSponsorList.indexOf(activeViewport);

    dots.forEach((dot, idx) => {
        if (idx === activeIndex) {
            dot.classList.add("is-active");
        } else {
            dot.classList.remove("is-active");
        }
    });
}

function formatTime(seconds) {
    if (isNaN(seconds)) return "00:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

/* ==========================================
   EVENT LISTENERS & HANDLERS
========================================== */

// Event Klik Target Slider
document.addEventListener("click", (e) => {
    if (e.target.closest(".video-controls") || e.target.closest(".sponsor-nav")) return;

    const clickedViewport = e.target.closest(".sponsor-viewport");
    if (clickedViewport && sponsorTrack.contains(clickedViewport)) {
        e.preventDefault();

        if (!clickedViewport.classList.contains("is-active")) {
            const currentScrollY = window.scrollY || window.pageYOffset;

            setActiveCenter(clickedViewport);

            window.scrollTo({
                top: currentScrollY,
                behavior: "instant"
            });
        }
    }
});

// Listener Navigasi Panah (Delegasi Event)
document.addEventListener("click", (e) => {
    const prevBtn = e.target.closest(".sponsor-prev");
    const nextBtn = e.target.closest(".sponsor-next");

    if (prevBtn) {
        e.preventDefault();
        prevSlide();
    }
    if (nextBtn) {
        e.preventDefault();
        nextSlide();
    }
});

// Listener Mute / Unmute Tombol Suara
document.addEventListener("click", (e) => {
    const soundBtn = e.target.closest(".sound-toggle-btn");
    if (soundBtn) {
        e.stopPropagation();
        const video = soundBtn.closest(".media-mask").querySelector("video");
        if (video) {
            video.muted = !video.muted;
            soundBtn.textContent = video.muted ? "🔇" : "🔊";
        }
    }
});

// Update Seeker Progress & Timer Video
document.addEventListener("timeupdate", (e) => {
    if (e.target.tagName === "VIDEO") {
        const video = e.target;
        const container = video.closest(".media-mask");
        if (!container) return;

        const seeker = container.querySelector(".video-seeker");
        const timeDisplay = container.querySelector(".video-time");

        if (seeker && video.duration) {
            seeker.value = (video.currentTime / video.duration) * 100;
        }

        if (timeDisplay) {
            timeDisplay.textContent = `${formatTime(video.currentTime)} / ${formatTime(video.duration)}`;
        }
    }
}, true);

// Fast-Forward / Rewind dengan Slider Seeker
document.addEventListener("input", (e) => {
    if (e.target.classList.contains("video-seeker")) {
        const seeker = e.target;
        const video = seeker.closest(".media-mask").querySelector("video");
        if (video && video.duration) {
            video.currentTime = (seeker.value / 100) * video.duration;
        }
    }
});

// Intersection Observer: Deteksi apakah Sponsor Slider terlihat di layar
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        isSectionVisible = entry.isIntersecting;

        const activeVp = sponsorTrack ? sponsorTrack.querySelector(".sponsor-viewport.is-active") : null;
        if (!activeVp) return;

        const video = activeVp.querySelector("video");

        if (isSectionVisible) {
            if (video) video.play().catch(() => {});
            handleAutoAdvance(activeVp);
        } else {
            if (video) video.pause();
            clearAutoAdvanceTimer();
        }
    });
}, { threshold: 0.3 });

if (sponsorSection) {
    observer.observe(sponsorSection);
}

// Inisialisasi Awal
window.addEventListener("DOMContentLoaded", () => {
    if (!sponsorTrack) return;
    
    masterSponsorList = Array.from(sponsorTrack.querySelectorAll(".sponsor-viewport"));
    setupPagination();

    const initialActive = sponsorTrack.querySelector(".sponsor-viewport.is-active") || sponsorTrack.querySelector(".sponsor-viewport");
    if (initialActive) {
        setActiveCenter(initialActive);
    }
});