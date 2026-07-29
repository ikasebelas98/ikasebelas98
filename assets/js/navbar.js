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

    icon: "assets/images/tumb 01 tentang kita.webp",

    links: [

        { text: "Sejarah", href: "#" },

        { text: "Visi & Misi", href: "#" },

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

        { text: "Dokumentasi photo", href: "#" },

        { text: "Dokumentasi Video", href: "#" },

        { text: "Podcast", href: "#" }

    ]

},

"community-hub": {

    title: "Ruang Kebersamaan, Menguatkan Silaturahmi",

    icon: "assets/images/tumb 04 community hub.webp",

    links: [

        { text: "RISALAH ( Ruang ISlami, Alqur'an & Amal Harian )", 
            
            href: "https://risalahikasman11bdg98.wordpress.com/",

            external: true
        },

        { text: "Event Alumni", href: "#" },

        { text: "Minat dan Hobi", href: "#" },

        { text: "RInDU - Ruang Inspirasi dan Edukasi",

            href: "https://ikasman11bandung98.wordpress.com/",

            external: true
        },

        { text: "Tips Bermanfaat", href: "#" },

        { text: "Rumor (Ruang Humor)", 

            href: "https://rumorikasman11bdg98.wordpress.com/",

            external: true

        },

        { text: "Rubik'98 (Ruang Bisnis dan Komersial)",

            href: "https://fjbikasman11bdg98.wordpress.com/",

            external: true

        },

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

    // Kosongkan daftar menu lama
    megaLinks.innerHTML = "";

    console.log(data.links.length);

    // Bangun menu baru dari megaData
    data.links.forEach(link => {

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

const tentangKita = document.querySelector("#tentang-kita");

const megaIcon = document.querySelector("#mega-icon");
const megaTitle = document.querySelector("#mega-title");
const megaLinks = document.querySelector("#mega-links");

console.log(megaTitle);

if (tentangKita) {

    
navItems.forEach(menu => {

    menu.addEventListener("mouseenter", () => {

    console.log("OPEN");

    // Reset animasi
    document.body.classList.remove("mega-open");

    setMegaAnchor(menu);

    loadMegaMenu(menu);

    // Jalankan animasi pada frame berikutnya
    requestAnimationFrame(() => {

        document.body.classList.add("mega-open");

    });

});

});

navbarMenu.addEventListener("mouseleave", (event) => {

    // Jika cursor sedang menuju Mega Menu,
    // jangan tutup Mega Menu.
    if (megaMenu.contains(event.relatedTarget)) {
        return;
    }

    console.log("NAVBAR CLOSE");

    document.body.classList.remove("mega-open");

});

megaMenu.addEventListener("mouseleave", () => {

    console.log("MEGA CLOSE");

    document.body.classList.remove("mega-open");

});

} else {

    console.log("ERROR: #tentang-kita tidak ditemukan");

}