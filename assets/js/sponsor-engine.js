/* ==========================================
   SPONSOR ENGINE (SYMMETRIC LEFT & RIGHT FLIP + AUTOPLAY + SWIPE/DRAG GESTURE)
========================================== */

const sponsorTrack = document.querySelector(".sponsor-track");
const sponsorSection = document.querySelector(".sponsor-slider");

const LEFT_COUNT = 5;
const RIGHT_COUNT = 5;

const MAX_9_16_HEIGHT = 568; 

const MORPH_DURATION = "1.8s";
const MORPH_EASING = "cubic-bezier(0.05, 0.7, 0.1, 1)";
const IMAGE_AUTO_DURATION = 8000; 

const SLOT_CLASSES = [
    "slot-xs", "slot-s", "slot-m", "slot-l", "slot-xl",
    "", 
    "slot-xl", "slot-l", "slot-m", "slot-s", "slot-xs"
];

let masterSponsorList = [];
let imageTimer = null;
let isSectionVisible = false;

/* ==========================================
   HELPER & CORE ENGINE
========================================== */

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

function setActiveCenter(targetViewport) {
    if (!targetViewport || !sponsorTrack) return;

    clearAutoAdvanceTimer();

    const currentDomItems = Array.from(sponsorTrack.querySelectorAll(".sponsor-viewport"));
    const targetIndex = currentDomItems.indexOf(targetViewport);

    if (targetIndex === -1) return;

    const total = currentDomItems.length;

    const firstCenters = new Map();
    currentDomItems.forEach((vp) => {
        const rect = vp.getBoundingClientRect();
        firstCenters.set(vp, rect.left + rect.width / 2);
    });

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

    reorderedItems.forEach((vp) => {
        vp.style.transition = "none";
    });

    sponsorTrack.innerHTML = "";
    reorderedItems.forEach((item) => sponsorTrack.appendChild(item));

    updateSliderVisuals(targetViewport, reorderedItems);
    updatePagination(targetViewport);

    void sponsorTrack.offsetHeight;

    reorderedItems.forEach((vp) => {
        const firstCenter = firstCenters.get(vp);
        if (firstCenter !== undefined) {
            const lastRect = vp.getBoundingClientRect();
            const lastCenter = lastRect.left + lastRect.width / 2;

            const deltaX = firstCenter - lastCenter;
            vp.style.transform = `translateX(${deltaX}px)`;
        }
    });

    void sponsorTrack.offsetHeight;

    requestAnimationFrame(() => {
        reorderedItems.forEach((vp) => {
            vp.style.transition = `transform ${MORPH_DURATION} ${MORPH_EASING}, width ${MORPH_DURATION} ${MORPH_EASING}, height ${MORPH_DURATION} ${MORPH_EASING}, opacity ${MORPH_DURATION} ${MORPH_EASING}`;
            vp.style.transform = "translateX(0)";
        });
    });

    handleAutoAdvance(targetViewport);
}

function updateSliderVisuals(activeTarget, reorderedItems) {
    const isMobile = window.innerWidth <= 991;

    reorderedItems.forEach((vp, index) => {
        const media = vp.querySelector("img, video");
        const isVideo = media && media.tagName === "VIDEO";

        vp.classList.remove("slot-xs", "slot-s", "slot-m", "slot-l", "slot-xl", "is-active");
        
        vp.style.width = "";
        vp.style.height = "";

        if (vp === activeTarget) {
            vp.classList.add("is-active");

            const ratio = getMediaRatio(vp);

            if (isMobile) {
                const mobileWidth = Math.min(window.innerWidth - 32, 380);
                vp.style.width = `${mobileWidth}px`;
                vp.style.height = `${mobileWidth / ratio}px`;
            } else {
                if (ratio < 0.8) { 
                    const activeHeight = MAX_9_16_HEIGHT;
                    vp.style.height = `${activeHeight}px`;
                    vp.style.width = `${activeHeight * ratio}px`;
                } else if (Math.abs(ratio - 1) < 0.2) { 
                    const activeSize = MAX_9_16_HEIGHT; 
                    vp.style.width = `${activeSize}px`;
                    vp.style.height = `${activeSize}px`;
                } else { 
                    const activeWidth = 640;
                    vp.style.width = `${activeWidth}px`;
                    vp.style.height = `${activeWidth / ratio}px`;
                }
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
                if (btn) btn.classList.add("is-muted");
            }

            const inactiveHeight = isMobile ? 120 : 200; 
            vp.style.height = `${inactiveHeight}px`;

            const slotClass = SLOT_CLASSES[index];
            if (slotClass) {
                vp.classList.add(slotClass);
            }
        }
    });
}

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

function nextSlide() {
    if (!sponsorTrack) return;
    const currentActive = sponsorTrack.querySelector(".sponsor-viewport.is-active");
    if (!currentActive) return;

    const currentDomItems = Array.from(sponsorTrack.querySelectorAll(".sponsor-viewport"));
    const activeIndex = currentDomItems.indexOf(currentActive);
    const nextIndex = (activeIndex + 1) % currentDomItems.length;

    setActiveCenter(currentDomItems[nextIndex]);
}

function prevSlide() {
    if (!sponsorTrack) return;
    const currentActive = sponsorTrack.querySelector(".sponsor-viewport.is-active");
    if (!currentActive) return;

    const currentDomItems = Array.from(sponsorTrack.querySelectorAll(".sponsor-viewport"));
    const activeIndex = currentDomItems.indexOf(currentActive);
    const prevIndex = (activeIndex - 1 + currentDomItems.length) % currentDomItems.length;

    setActiveCenter(currentDomItems[prevIndex]);
}

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
   FITUR SWIPE / DRAG GESTURE (HP & DESKTOP)
========================================== */

function setupSwipeGestures() {
    if (!sponsorSection) return;

    let startX = 0;
    let startY = 0;
    let isDragging = false;
    let isHorizontalSwipe = false;
    const SWIPE_THRESHOLD = 40; // Ambang batas minimum geser (px)

    // Mencegah konflik dengan kontrol internal video & navigasi
    function isIgnoredElement(target) {
        return !!target.closest(".video-controls, .video-seeker, .volume-slider, .sound-toggle-btn, .sponsor-nav, .sponsor-pagination");
    }

    // Touch Event Handlers
    sponsorSection.addEventListener("touchstart", (e) => {
        if (isIgnoredElement(e.target)) return;
        const touch = e.touches[0];
        startX = touch.clientX;
        startY = touch.clientY;
        isDragging = true;
        isHorizontalSwipe = false;
    }, { passive: true });

    sponsorSection.addEventListener("touchmove", (e) => {
        if (!isDragging) return;

        const touch = e.touches[0];
        const diffX = touch.clientX - startX;
        const diffY = touch.clientY - startY;

        // Tentukan orientasi geseran
        if (!isHorizontalSwipe) {
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 10) {
                isHorizontalSwipe = true;
            }
        }

        if (isHorizontalSwipe && e.cancelable) {
            e.preventDefault(); // Mencegah scroll halaman saat pengguna menggeser slider secara horizontal
        }
    }, { passive: false });

    sponsorSection.addEventListener("touchend", (e) => {
        if (!isDragging) return;
        isDragging = false;

        const touch = e.changedTouches[0];
        const diffX = touch.clientX - startX;

        if (isHorizontalSwipe && Math.abs(diffX) >= SWIPE_THRESHOLD) {
            if (diffX < 0) {
                nextSlide(); // Geser ke kiri -> Slide selanjutnya
            } else {
                prevSlide(); // Geser ke kanan -> Slide sebelumnya
            }
        }
    }, { passive: true });

    // Mouse Drag Handlers (Desktop Support)
    sponsorSection.addEventListener("mousedown", (e) => {
        if (isIgnoredElement(e.target) || e.button !== 0) return;
        startX = e.clientX;
        startY = e.clientY;
        isDragging = true;
        isHorizontalSwipe = false;
    });

    window.addEventListener("mousemove", (e) => {
        if (!isDragging) return;

        const diffX = e.clientX - startX;
        const diffY = e.clientY - startY;

        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 10) {
            isHorizontalSwipe = true;
        }
    });

    window.addEventListener("mouseup", (e) => {
        if (!isDragging) return;
        isDragging = false;

        const diffX = e.clientX - startX;

        if (isHorizontalSwipe && Math.abs(diffX) >= SWIPE_THRESHOLD) {
            if (diffX < 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    });
}

/* ==========================================
   EVENT LISTENERS & HANDLERS
========================================== */

document.addEventListener("click", (e) => {
    if (e.target.closest(".video-controls") || e.target.closest(".sponsor-nav")) return;

    const clickedViewport = e.target.closest(".sponsor-viewport");
    if (clickedViewport && sponsorTrack && sponsorTrack.contains(clickedViewport)) {
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

// Listener Mute / Unmute
document.addEventListener("click", (e) => {
    const soundBtn = e.target.closest(".sound-toggle-btn");
    if (soundBtn) {
        e.stopPropagation();
        const container = soundBtn.closest(".media-mask");
        const video = container ? container.querySelector("video") : null;
        const volumeSlider = container ? container.querySelector(".volume-slider") : null;

        if (video) {
            video.muted = !video.muted;
            if (video.muted) {
                soundBtn.classList.add("is-muted");
                if (volumeSlider) volumeSlider.value = 0;
            } else {
                soundBtn.classList.remove("is-muted");
                if (volumeSlider) volumeSlider.value = video.volume || 1;
            }
        }
    }
});

// Listener Input Volume Slider
document.addEventListener("input", (e) => {
    if (e.target.classList.contains("volume-slider")) {
        const slider = e.target;
        const container = slider.closest(".media-mask");
        const video = container ? container.querySelector("video") : null;
        const soundBtn = container ? container.querySelector(".sound-toggle-btn") : null;

        if (video) {
            const val = parseFloat(slider.value);
            video.volume = val;
            video.muted = val === 0;

            if (soundBtn) {
                if (video.muted) {
                    soundBtn.classList.add("is-muted");
                } else {
                    soundBtn.classList.remove("is-muted");
                }
            }
        }
    }
});

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

document.addEventListener("input", (e) => {
    if (e.target.classList.contains("video-seeker")) {
        const seeker = e.target;
        const container = seeker.closest(".media-mask");
        const video = container ? container.querySelector("video") : null;
        if (video && video.duration) {
            video.currentTime = (seeker.value / 100) * video.duration;
        }
    }
});

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

window.addEventListener("DOMContentLoaded", () => {
    if (!sponsorTrack) return;
    
    masterSponsorList = Array.from(sponsorTrack.querySelectorAll(".sponsor-viewport"));
    setupPagination();
    setupSwipeGestures();

    const initialActive = sponsorTrack.querySelector(".sponsor-viewport.is-active") || sponsorTrack.querySelector(".sponsor-viewport");
    if (initialActive) {
        setActiveCenter(initialActive);
    }
});