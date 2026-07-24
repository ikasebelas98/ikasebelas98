console.log("navbar.js loaded");

/* ==========================================
   SELECT ELEMENT
========================================== */

const navItems = document.querySelectorAll(".nav-item");

const navbarMenu = document.querySelector(".navbar-menu");

const megaMenu = document.querySelector(".mega-menu");

console.log(navItems);

/* ==========================================
   MEGA MENU DATA
========================================== */

const megaData = {

    "tentang-kita": {

    title: "Satu Perjalanan untuk Maju Bersama",

    icon: "assets/images/tumb 01 tentang kita.webp"

},

    "alumni-center": {

    title: "Terhubung, Berkarya, dan Bertumbuh Bersama",

    icon: "assets/images/tumb 02 alumni center.webp"

},

    "media-center": {

    title: "Informasi, Inspirasi, dan Dokumentasi Alumni",

    icon: "assets/images/tumb 03 media center.webp"

},

    "community-hub": {

    title: "Bersinergi Melalui Komunitas dan Kegiatan",

    icon: "assets/images/tumb 04 community hub.webp"

},

    "donasi": {

    title: "Bersama Memberi, Bersama Menginspirasi",

    icon: "assets/images/tumb 05 donasi.webp"

},

    "login": {

    title: "Akses Mudah ke Layanan Alumni",

    icon: "assets/images/tumb 06 login.webp"

},

};

/* ==========================================
   FUNCTION
========================================== */

function setMegaAnchor(menu) {

    if (!menu) return;

    const rect = menu.getBoundingClientRect();

    document.documentElement.style.setProperty(
        "--mega-offset",
        `${rect.left}px`
    );

}

function loadMegaMenu(menu) {

    const data = megaData[menu.id];

    if (!data) return;

    megaTitle.textContent = data.title;

    megaIcon.src = data.icon;

}

const tentangKita = document.querySelector("#tentang-kita");

const megaIcon = document.querySelector("#mega-icon");
const megaTitle = document.querySelector("#mega-title");
const megaLinks = document.querySelector("#mega-links");

console.log(megaTitle);

if (tentangKita) {

    
 navItems.forEach(menu => {

    menu.addEventListener("mouseenter", () => {

        console.log("OPEN");

        setMegaAnchor(menu);

        loadMegaMenu(menu);

        document.body.classList.add("mega-open");

    });

});

navbarMenu.addEventListener("mouseleave", () => {

    console.log("NAVBAR CLOSE");

    document.body.classList.remove("mega-open");

});

} else {

    console.log("ERROR: #tentang-kita tidak ditemukan");

}