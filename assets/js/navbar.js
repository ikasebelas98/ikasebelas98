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
            { text: "Database Alumni", href: "database-alumni.html" },
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
            { text: "RISALAH Islami", href: "https://risalahikasman11bdg98.wordpress.com/", external: true },
            { text: "Event Alumni", href: "#" },
            { text: "Minat dan Hobi", href: "#" },
            { text: "RInDU - Inspirasi & Edukasi", href: "https://ikasman11bandung98.wordpress.com/", external: true },
            { text: "Tips Bermanfaat", href: "#" },
            { text: "Rumor - Ruang Humor", href: "https://rumorikasman11bdg98.wordpress.com/", external: true },
            { text: "Rubik - Bisnis & Komersial", href: "https://fjbikasman11bdg98.wordpress.com/", external: true }
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
            { text: "Registrasi Alumni Baru", href: "auth.html?mode=register" },
            { text: "Alumni Sign In (Masuk)", href: "auth.html?mode=login" },
            { text: "Admin Login", href: "admin-login.html" },
            { text: "Lupa Password", href: "reset-password.html" }
        ]
    }
};

/* ==========================================
   DESKTOP MEGA MENU LOGIC
========================================== */
function loadMegaMenu(menuId) {
    const data = megaData[menuId];
    if (!data) return false;

    if (megaTitle) megaTitle.innerHTML = data.title;
    
    // PERBAIKAN: Paksa pembaruan gambar thumbnail / foto profil
    if (megaIcon) {
        megaIcon.removeAttribute("src"); // Reset src dulu agar Base64 baru ter-load penuh
        megaIcon.src = data.icon || "assets/images/tumb 06 login.webp";
    }

    if (megaLinks) {
        megaLinks.innerHTML = "";
        data.links.forEach((link) => {
            const li = document.createElement("li");
            const a = document.createElement("a");
            a.href = link.href;
            if (link.id) a.id = link.id;
            if (link.style) a.setAttribute("style", link.style);
            if (link.external) {
                a.target = "_blank";
                a.rel = "noopener noreferrer";
            }
            a.innerHTML = link.text;
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
        if (window.innerWidth > 991 && megaMenu && !megaMenu.contains(event.relatedTarget)) {
            document.body.classList.remove("mega-open");
        }
    });

    megaMenu.addEventListener("mouseleave", (event) => {
        if (window.innerWidth > 991 && navbarMenu && !navbarMenu.contains(event.relatedTarget)) {
            document.body.classList.remove("mega-open");
        }
    });
}

/* ==========================================
   MOBILE ACCORDION LOGIC
========================================== */
function setupMobileSubmenus() {
    navItems.forEach(item => {
        const menuId = item.id;
        const data = megaData[menuId];

        if (data) {
            const oldSub = item.querySelector(".mobile-submenu");
            if (oldSub) oldSub.remove();

            const subUl = document.createElement("ul");
            subUl.className = "mobile-submenu";

            data.links.forEach(link => {
                const li = document.createElement("li");
                const a = document.createElement("a");
                a.href = link.href;
                a.innerHTML = link.text;
                if (link.id) {
                    a.id = link.id + "-mobile";
                }
                if (link.external) {
                    a.target = "_blank";
                    a.rel = "noopener noreferrer";
                }
                li.appendChild(a);
                subUl.appendChild(li);
            });

            item.appendChild(subUl);

            const mainLink = item.querySelector("a");
            mainLink.onclick = (e) => {
                if (window.innerWidth <= 991) {
                    e.preventDefault();
                    const isOpen = item.classList.contains("active");

                    navItems.forEach(otherItem => {
                        otherItem.classList.remove("active");
                        const otherSub = otherItem.querySelector(".mobile-submenu");
                        if (otherSub) otherSub.style.maxHeight = null;
                    });

                    if (!isOpen) {
                        item.classList.add("active");
                        subUl.style.maxHeight = subUl.scrollHeight + "px";
                    }
                }
            };
        }
    });
}

setupMobileSubmenus();

/* ==========================================
   MOBILE TOGGLE BUTTON
========================================== */
const navbarToggle = document.getElementById("navbarToggle");
if (navbarToggle && navbarMenu) {
    navbarToggle.addEventListener("click", () => {
        navbarMenu.classList.toggle("active");
    });
}

/* ==========================================
   UPDATE MEGA MENU STATE (FIREBASE INTEGRATION)
========================================== */
window.updateMegaMenuState = function(user, userInfo) {
    if (user && userInfo) {
        const namaLengkap = userInfo.namaLengkap || user.displayName || "ALUMNI SMAN 11";
        const namaPanggilan = userInfo.namaPanggilan || "ALUMNI";
        const email = userInfo.email || user.email || "";
        const userRole = userInfo.role || "member"; // <-- Menangkap role dari data user
        
        // Cek foto user dari Firebase, jika tidak ada pakai gambar default
        const photoUrl = userInfo.foto && userInfo.foto.trim() !== "" 
            ? userInfo.foto 
            : "assets/images/tumb 06 login.webp";

        const titleHtml = `<span style="color: #1f2433; font-weight: 700; display: block; font-size: 20px; line-height: 1.1; margin-bottom: 0px;">${namaLengkap}</span>`;
        const profileSubtext = `${namaPanggilan} (${email}) - [${userRole.toUpperCase()}]`;

        // Daftar link dasar untuk semua member yang login
        let userLinks = [
            { 
                text: profileSubtext, 
                href: "javascript:void(0);", 
                style: "color: #1f2433; font-size: 12px; font-weight: 600; cursor: default; margin-top: -8px; margin-bottom: 24px; display: block; opacity: 0.85;" 
            },
            { text: "Update Profile & ID Card", href: "auth.html?mode=edit" }
        ];

        // TAMBAHAN MENU KHUSUS JIKA ADMIN ATAU SUPER ADMIN
        if (userRole === "admin" || userRole === "super_admin") {
            userLinks.push(
                { text: "Control Panel", href: "admin-panel.html", style: "color: #0495ce; font-weight: 700;" }
            );
        }

        // TAMBAHAN MENU KHUSUS JIKA SUPER ADMIN (Tombol Darurat / Kontrol Sistem)
        if (userRole === "super_admin") {
            userLinks.push(
                { text: "Emergency Control (Shutdown)", href: "supercontrol.html", style: "color: #0495ce; font-weight: 700;" }
            );
        }

        // Tombol Sign Out SELALU dimasukkan di paling bawah untuk semua role
        userLinks.push(
            { text: "Sign Out", href: "javascript:void(0);", id: "btnLogoutMega" }
        );

        megaData["login"] = {
            title: titleHtml,
            icon: photoUrl,
            links: userLinks
        };
    } else {
        megaData["login"] = {
            title: "Gabung Kembali Menyambung Silaturahmi",
            icon: "assets/images/tumb 06 login.webp",
            links: [
                { text: "Registrasi Alumni Baru", href: "auth.html?mode=register" },
                { text: "Sign In (Masuk)", href: "auth.html?mode=login" },
                { text: "Lupa Password", href: "reset-password.html" }
            ]
        };
    }

    if (typeof loadMegaMenu === "function") {
        loadMegaMenu("login");
    }
    if (typeof setupMobileSubmenus === "function") {
        setupMobileSubmenus();
    }
};

/* ==========================================
   EVENT LISTENER LOG OUT (GLOBAL)
========================================== */
document.addEventListener("click", function (e) {
    if (e.target && (e.target.id === "btnLogoutMega" || e.target.id === "btnLogoutMega-mobile")) {
        e.preventDefault();
        if (window.firebaseSignOut && window.firebaseAuth) {
            window.firebaseSignOut(window.firebaseAuth).then(() => {
                window.location.reload();
            }).catch((err) => {
                console.error("Gagal Logout:", err);
            });
        } else {
            console.warn("Firebase Auth belum diinisialisasi di global scope.");
        }
    }
});
