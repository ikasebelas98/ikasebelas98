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
   DESKTOP MEGA MENU LOGIC
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

if (navItems.length > 0 && megaMenu) {
    navItems.forEach(menu => {
        menu.addEventListener("mouseenter", () => {
            if (window.innerWidth > 991) {
                document.body.classList.remove("mega-open");
                const success = loadMegaMenu(menu.id);
                if (success) {
                    requestAnimationFrame(() => {
                        document.body.classList.add("mega-open");
                    });
                }
            }
        });
    });

    navbarMenu.addEventListener("mouseleave", (event) => {
        if (window.innerWidth > 991 && !megaMenu.contains(event.relatedTarget)) {
            document.body.classList.remove("mega-open");
        }
    });

    megaMenu.addEventListener("mouseleave", (event) => {
        if (window.innerWidth > 991 && !navbarMenu.contains(event.relatedTarget)) {
            document.body.classList.remove("mega-open");
        }
    });
}

/* ==========================================
   MOBILE ACCORDION SUBMENU LOGIC
========================================== */
function setupMobileSubmenus() {
    navItems.forEach(item => {
        const menuId = item.id;
        const data = megaData[menuId];

        // Jika data sub-menu ada & belum pernah dibuat elemen sub-menunya
        if (data && !item.querySelector(".mobile-submenu")) {
            const subUl = document.createElement("ul");
            subUl.className = "mobile-submenu";

            data.links.forEach(link => {
                const li = document.createElement("li");
                const a = document.createElement("a");
                a.href = link.href;
                a.textContent = link.text;
                if (link.external) {
                    a.target = "_blank";
                    a.rel = "noopener noreferrer";
                }
                li.appendChild(a);
                subUl.appendChild(li);
            });

            item.appendChild(subUl);

            // Event handler saat menu utama diklik di HP
            const mainLink = item.querySelector("a");
            mainLink.addEventListener("click", (e) => {
                if (window.innerWidth <= 991) {
                    e.preventDefault(); // Mencegah pindah halaman langsung

                    const isOpen = item.classList.contains("active");

                    // Tutup semua accordion lain
                    navItems.forEach(otherItem => {
                        otherItem.classList.remove("active");
                        const otherSub = otherItem.querySelector(".mobile-submenu");
                        if (otherSub) otherSub.style.maxHeight = null;
                    });

                    // Buka/tutup accordion yang diklik
                    if (!isOpen) {
                        item.classList.add("active");
                        subUl.style.maxHeight = subUl.scrollHeight + "px";
                    }
                }
            });
        }
    });
}

// Inisialisasi Sub-menu Mobile
setupMobileSubmenus();

/* ==========================================
   MOBILE MENU TOGGLE
========================================== */
const navbarToggle = document.getElementById("navbarToggle");
if (navbarToggle && navbarMenu) {
    navbarToggle.addEventListener("click", () => {
        navbarMenu.classList.toggle("active");
    });
}