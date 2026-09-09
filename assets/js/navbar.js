console.log("navbar.js loaded");

/* ==========================================
   SELECT ELEMENTS
========================================== */
const navItems = document.querySelectorAll(".nav-item");
const navbarMenu = document.querySelector(".navbar-menu");
const megaMenu = document.querySelector(".mega-menu");
const megaIcon = document.querySelector("#mega-icon");
const megaTitle = document.querySelector("#mega-title");
const megaLinks = document.querySelector("#mega-links");

/* ==========================================
   MEGA MENU DATA
========================================== */
const megaData = {
    "tentang-kita": {
        title: "Satu Perjalanan untuk Maju Bersama",
        icon: "assets/images/tumb 01 tentang kita.webp",
        links: [
            { text: "Tentang IKA.11.98", href: "#" },
            { text: "Visi dan Misi", href: "#" },
            { text: "Struktur Organisasi", href: "#" },
            { text: "Pengurus", href: "#" },
            { text: "Legalitas", href: "#" },
            { text: "Kontak", href: "#" }
        ]
    },
    "alumni-center": {
        title: "Rumah Bersama Terhubung Selamanya",
        icon: "assets/images/tumb 02 alumni center.webp",
        links: [
            { text: "Database Alumni", href: "#" },
            { text: "Jejaring Profesi", href: "#" },
            { text: "Karier dan Lowongan Pekerjaan", href: "#" },
            { text: "Mentoring Alumni", href: "#" },
            { text: "Prestasi Alumni", href: "#" },
            { text: "Ulang Tahun", href: "#" },
            { text: "In Memoriam", href: "#" }
        ]
    },
    "media-center": {
        title: "Merekam Kenangan, Mengabadikan Kebersamaan",
        icon: "assets/images/tumb 03 media center.webp",
        links: [
            { text: "Direktori Usaha", href: "#" },
            { text: "Direktori Keahlian", href: "#" },
            { text: "Lowongan Pekerjaan", href: "#" },
            { text: "Dokumentasi Photo", href: "#" },
            { text: "Dokumentasi Video", href: "#" },
            { text: "Podcast", href: "#" }
        ]
    },
    "community-hub": {
        title: "Ruang Kebersamaan, Menguatkan Silaturahmi",
        icon: "assets/images/tumb 04 community hub.webp",
        links: [
            { text: "RISALAH ( Ruang ISlami, Alqur'an & Amal Harian )", href: "https://risalahikasman11bdg98.wordpress.com/", external: true },
            { text: "Event Alumni", href: "#" },
            { text: "Minat dan Hobi", href: "#" },
            { text: "RInDU - Ruang Inspirasi dan Edukasi", href: "https://ikasman11bandung98.wordpress.com/", external: true },
            { text: "Tips Bermanfaat", href: "#" },
            { text: "Rumor (Ruang Humor)", href: "https://rumorikasman11bdg98.wordpress.com/", external: true },
            { text: "Rubik'98 (Ruang Bisnis dan Komersial)", href: "https://fjbikasman11bdg98.wordpress.com/", external: true }
        ]
    },
    "donasi": {
        title: "Peduli Bersama Memberi manfaat",
        icon: "assets/images/tumb 05 donasi.webp",
        links: [
            { text: "Mari Berdonasi", href: "#" },
            { text: "Laporan Dana Donasi", href: "#" },
            { text: "Program Sosial", href: "#" },
            { text: "Beasiswa", href: "#" },
            { text: "Menjadi Donatur", href: "#" }
        ]
    },
    "login": {
        title: "Gabung Kembali Menyambung Silaturahmi",
        icon: "assets/images/tumb 06 login.webp",
        links: [
            { text: "Daftar Baru", href: "#" },
            { text: "Alumni Login", href: "#" },
            { text: "Admin Login", href: "#" },
            { text: "Lupa Password", href: "#" }
        ]
    }
};

/* ==========================================
   FUNCTIONS
========================================== */
function loadMegaMenu(menuId) {
    const data = megaData[menuId];
    if (!data) return false;

    if (megaTitle) megaTitle.textContent = data.title;
    if (megaIcon) megaIcon.src = data.icon;

    if (megaLinks) {
        megaLinks.innerHTML = "";

        data.links.forEach((link) => {
            const li = document.createElement("li");
            const a = document.createElement("a");
            a.href = link.href;

            if (link.external) {
                a.target = "_blank";
                a.rel = "noopener noreferrer";
            }

            a.textContent = link.text;
            li.appendChild(a);
            megaLinks.appendChild(li);
        });
    }

    return true;
}

/* ==========================================
   EVENT LISTENERS
========================================== */
if (navItems.length > 0 && megaMenu) {

    // Hover ke setiap item menu di Navbar
    navItems.forEach(menu => {
        menu.addEventListener("mouseenter", () => {
            // Reset class untuk memicu ulang animasi CSS dari awal
            document.body.classList.remove("mega-open");

            const success = loadMegaMenu(menu.id);

            if (success) {
                // Beri jeda 1 frame agar browser mendeteksi perubahan DOM & mengulang animasi
                requestAnimationFrame(() => {
                    document.body.classList.add("mega-open");
                });
            }
        });
    });

    // Menjaga Mega Menu tetap terbuka saat kursor berpindah ke Mega Menu
    navbarMenu.addEventListener("mouseleave", (event) => {
        if (megaMenu.contains(event.relatedTarget)) {
            return; // Kursor mengarah ke mega menu, jangan tutup
        }
        document.body.classList.remove("mega-open");
    });

    megaMenu.addEventListener("mouseleave", (event) => {
        if (navbarMenu.contains(event.relatedTarget)) {
            return; // Kursor mengarah kembali ke navbar menu, jangan tutup
        }
        document.body.classList.remove("mega-open");
    });

}

/* ==========================================
   MOBILE MENU TOGGLE
========================================== */
const navbarToggle = document.getElementById("navbarToggle");
if (navbarToggle && navbarMenu) {
    navbarToggle.addEventListener("click", () => {
        navbarMenu.classList.toggle("active");
    });
}