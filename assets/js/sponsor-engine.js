/* ==========================================
   SPONSOR ENGINE
========================================== */

const sponsorViewports = document.querySelectorAll(".sponsor-viewport");

console.log("Sponsor Engine Loaded");
console.log(sponsorViewports);


/* ==========================================
   ACTIVE VIEWPORT
========================================== */

const activeViewport = document.querySelector(".is-active");

console.log(activeViewport);


/* ==========================================
ACTIVE MEDIA DETECTION
========================================== */

const activeMedia =
    activeViewport.querySelector("img, video");


/* ==========================================
GET MEDIA RATIO
========================================== */

function getMediaRatio(){

    /* ======================================
       NO MEDIA
    ====================================== */

    if (!activeMedia) {

        return null;

    }


    /* ======================================
       IMAGE INTRINSIC RATIO
    ====================================== */

    if (activeMedia.tagName === "IMG") {

        if (
            activeMedia.naturalWidth &&
            activeMedia.naturalHeight
        ) {

            return (
                activeMedia.naturalWidth /
                activeMedia.naturalHeight
            );

        }

    }


    /* ======================================
       VIDEO INTRINSIC RATIO
    ====================================== */

    if (activeMedia.tagName === "VIDEO") {

        if (
            activeMedia.videoWidth &&
            activeMedia.videoHeight
        ) {

            return (
                activeMedia.videoWidth /
                activeMedia.videoHeight
            );

        }

    }


    /* ======================================
       FALLBACK DATA-RATIO
    ====================================== */

    const fallbackRatio =
        activeViewport.dataset.ratio;


    if (fallbackRatio === "16:9") {

        return 16 / 9;

    }


    if (fallbackRatio === "9:16") {

        return 9 / 16;

    }


    if (fallbackRatio === "1:1") {

        return 1;

    }


    return null;

}


/* ==========================================
SET ACTIVE WIDTH
========================================== */

function setActiveWidth(ratio){

    const activeHeight = 400;

    let activeWidth;


    /* ======================================
       16:9
    ====================================== */

    if (
        Math.abs(ratio - (16 / 9)) < 0.01
    ) {

        activeWidth =
            activeHeight * 16 / 9;

    }


    /* ======================================
       9:16
    ====================================== */

    else if (
        Math.abs(ratio - (9 / 16)) < 0.01
    ) {

        activeWidth =
            activeHeight * 9 / 16;

    }


    /* ======================================
       1:1
    ====================================== */

    else if (
        Math.abs(ratio - 1) < 0.01
    ) {

        activeWidth =
            activeHeight;

    }


    /* ======================================
       UNKNOWN RATIO
    ====================================== */

    else {

        console.warn(
            "Unknown media ratio:",
            ratio
        );

        return;

    }


    activeViewport.style.width =
        activeWidth + "px";

}


/* ==========================================
UPDATE ACTIVE WIDTH
========================================== */

function updateActiveWidth(){

    const ratio =
        getMediaRatio();


    if (ratio === null) {

        return;

    }


    setActiveWidth(ratio);

}


/* ==========================================
WAIT FOR MEDIA LOAD
========================================== */

if (activeMedia) {

    if (
        activeMedia.tagName === "IMG" &&
        !activeMedia.complete
    ) {

        activeMedia.addEventListener(
            "load",
            updateActiveWidth,
            { once: true }
        );

    }

}


/* ==========================================
INITIAL UPDATE
========================================== */

updateActiveWidth();


/* ==========================================
ACTIVE POSITION TEST
========================================== */

const activeRect =
    activeViewport.getBoundingClientRect();

console.log(activeRect);

console.log(window.innerWidth);