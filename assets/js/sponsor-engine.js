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
   SET ACTIVE WIDTH
========================================== */

function setActiveWidth(width){

    activeViewport.style.width = width + "px";

}

setActiveWidth(225);

/* ==========================================
CENTER ACTIVE
========================================== */

const sponsorWrapper = document.querySelector(".sponsor-wrapper");

function centerActive() {

    const activeRect = activeViewport.getBoundingClientRect();

    const activeCenter =
        activeRect.left + (activeRect.width / 2);

    const screenCenter =
        window.innerWidth / 2;

    const offset =
        screenCenter - activeCenter;

    sponsorWrapper.style.transform =
        `translateX(${offset}px)`;

}

centerActive();

/* ==========================================
   ACTIVE POSITION TEST
========================================== */

const activeRect = activeViewport.getBoundingClientRect();

console.log(activeRect);

console.log(window.innerWidth);