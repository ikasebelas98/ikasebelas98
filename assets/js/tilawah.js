/* ==========================================
   OWOJ TILAWAH DASHBOARD ENGINE
========================================== */

// DATA MAPPING 114 SURAT BERDASARKAN JUZ
const QURAN_JUZ_DATA = {
    1: [{ no: 1, name: "Al-Fatihah", ayat: "1 - 7" }, { no: 2, name: "Al-Baqarah", ayat: "1 - 141" }],
    2: [{ no: 2, name: "Al-Baqarah", ayat: "142 - 252" }],
    3: [{ no: 2, name: "Al-Baqarah", ayat: "253 - 286" }, { no: 3, name: "Ali 'Imran", ayat: "1 - 92" }],
    4: [{ no: 3, name: "Ali 'Imran", ayat: "93 - 200" }, { no: 4, name: "An-Nisa'", ayat: "1 - 23" }],
    5: [{ no: 4, name: "An-Nisa'", ayat: "24 - 147" }],
    6: [{ no: 4, name: "An-Nisa'", ayat: "148 - 176" }, { no: 5, name: "Al-Ma'idah", ayat: "1 - 81" }],
    7: [{ no: 5, name: "Al-Ma'idah", ayat: "82 - 120" }, { no: 6, name: "Al-An'am", ayat: "1 - 110" }],
    8: [{ no: 6, name: "Al-An'am", ayat: "111 - 165" }, { no: 7, name: "Al-A'raf", ayat: "1 - 87" }],
    9: [{ no: 7, name: "Al-A'raf", ayat: "88 - 206" }, { no: 8, name: "Al-Anfal", ayat: "1 - 40" }],
    10: [{ no: 8, name: "Al-Anfal", ayat: "41 - 75" }, { no: 9, name: "At-Taubah", ayat: "1 - 92" }],
    11: [{ no: 9, name: "At-Taubah", ayat: "93 - 129" }, { no: 10, name: "Yunus", ayat: "1 - 109" }, { no: 11, name: "Hud", ayat: "1 - 5" }],
    12: [{ no: 11, name: "Hud", ayat: "6 - 123" }, { no: 12, name: "Yusuf", ayat: "1 - 52" }],
    13: [{ no: 12, name: "Yusuf", ayat: "53 - 111" }, { no: 13, name: "Ar-Ra'd", ayat: "1 - 43" }, { no: 14, name: "Ibrahim", ayat: "1 - 52" }],
    14: [{ no: 15, name: "Al-Hijr", ayat: "1 - 99" }, { no: 16, name: "An-Nahl", ayat: "1 - 128" }],
    15: [{ no: 17, name: "Al-Isra'", ayat: "1 - 111" }, { no: 18, name: "Al-Kahf", ayat: "1 - 74" }],
    16: [{ no: 18, name: "Al-Kahf", ayat: "75 - 110" }, { no: 19, name: "Maryam", ayat: "1 - 98" }, { no: 20, name: "Taha", ayat: "1 - 135" }],
    17: [{ no: 21, name: "Al-Anbiya'", ayat: "1 - 112" }, { no: 22, name: "Al-Hajj", ayat: "1 - 78" }],
    18: [{ no: 23, name: "Al-Mu'minun", ayat: "1 - 118" }, { no: 24, name: "An-Nur", ayat: "1 - 64" }, { no: 25, name: "Al-Furqan", ayat: "1 - 20" }],
    19: [{ no: 25, name: "Al-Furqan", ayat: "21 - 77" }, { no: 26, name: "Asy-Syu'ara'", ayat: "1 - 227" }, { no: 27, name: "An-Naml", ayat: "1 - 55" }],
    20: [{ no: 27, name: "An-Naml", ayat: "56 - 93" }, { no: 28, name: "Al-Qasas", ayat: "1 - 88" }, { no: 29, name: "Al-'Ankabut", ayat: "1 - 45" }],
    21: [{ no: 29, name: "Al-'Ankabut", ayat: "46 - 69" }, { no: 30, name: "Ar-Rum", ayat: "1 - 60" }, { no: 31, name: "Luqman", ayat: "1 - 34" }, { no: 32, name: "As-Sajdah", ayat: "1 - 30" }, { no: 33, name: "Al-Ahzab", ayat: "1 - 30" }],
    22: [{ no: 33, name: "Al-Ahzab", ayat: "31 - 73" }, { no: 34, name: "Saba'", ayat: "1 - 54" }, { no: 35, name: "Fatir", ayat: "1 - 45" }, { no: 36, name: "Yasin", ayat: "1 - 27" }],
    23: [{ no: 36, name: "Yasin", ayat: "28 - 83" }, { no: 37, name: "As-Saffat", ayat: "1 - 182" }, { no: 38, name: "Sad", ayat: "1 - 88" }, { no: 39, name: "Az-Zumar", ayat: "1 - 31" }],
    24: [{ no: 39, name: "Az-Zumar", ayat: "32 - 75" }, { no: 40, name: "Ghafir", ayat: "1 - 85" }, { no: 41, name: "Fussilat", ayat: "1 - 46" }],
    25: [{ no: 41, name: "Fussilat", ayat: "47 - 54" }, { no: 42, name: "Asy-Syura", ayat: "1 - 53" }, { no: 43, name: "Az-Zukhruf", ayat: "1 - 89" }, { no: 44, name: "Ad-Dukhan", ayat: "1 - 59" }, { no: 45, name: "Al-Jasiyah", ayat: "1 - 37" }],
    26: [{ no: 46, name: "Al-Ahqaf", ayat: "1 - 35" }, { no: 47, name: "Muhammad", ayat: "1 - 38" }, { no: 48, name: "Al-Fath", ayat: "1 - 29" }, { no: 49, name: "Al-Hujurat", ayat: "1 - 18" }, { no: 50, name: "Qaf", ayat: "1 - 45" }, { no: 51, name: "Az-Zariyat", ayat: "1 - 30" }],
    27: [{ no: 51, name: "Az-Zariyat", ayat: "31 - 60" }, { no: 52, name: "At-Tur", ayat: "1 - 49" }, { no: 53, name: "An-Najm", ayat: "1 - 62" }, { no: 54, name: "Al-Qamar", ayat: "1 - 55" }, { no: 55, name: "Ar-Rahman", ayat: "1 - 78" }, { no: 56, name: "Al-Waqi'ah", ayat: "1 - 96" }, { no: 57, name: "Al-Hadid", ayat: "1 - 29" }],
    28: [{ no: 58, name: "Al-Mujadilah", ayat: "1 - 22" }, { no: 59, name: "Al-Hasyr", ayat: "1 - 24" }, { no: 60, name: "Al-Mumtahanah", ayat: "1 - 13" }, { no: 61, name: "As-Saff", ayat: "1 - 14" }, { no: 62, name: "Al-Jumu'ah", ayat: "1 - 11" }, { no: 63, name: "Al-Munafiqun", ayat: "1 - 11" }, { no: 64, name: "At-Taghabun", ayat: "1 - 18" }, { no: 65, name: "At-Talaq", ayat: "1 - 12" }, { no: 66, name: "At-Tahrim", ayat: "1 - 12" }],
    29: [{ no: 67, name: "Al-Mulk", ayat: "1 - 30" }, { no: 68, name: "Al-Qalam", ayat: "1 - 52" }, { no: 69, name: "Al-Haqqah", ayat: "1 - 52" }, { no: 70, name: "Al-Ma'arij", ayat: "1 - 44" }, { no: 71, name: "Nuh", ayat: "1 - 28" }, { no: 72, name: "Al-Jinn", ayat: "1 - 28" }, { no: 73, name: "Al-Muzzammil", ayat: "1 - 20" }, { no: 74, name: "Al-Muddassir", ayat: "1 - 56" }, { no: 75, name: "Al-Qiyamah", ayat: "1 - 40" }, { no: 76, name: "Al-Insan", ayat: "1 - 31" }, { no: 77, name: "Al-Mursalat", ayat: "1 - 50" }],
    30: [
        { no: 78, name: "An-Naba'", ayat: "1 - 40" }, { no: 79, name: "An-Nazi'at", ayat: "1 - 46" }, { no: 80, name: "'Abasa", ayat: "1 - 42" },
        { no: 81, name: "At-Takwir", ayat: "1 - 29" }, { no: 82, name: "Al-Infitar", ayat: "1 - 19" }, { no: 83, name: "Al-Mutaffifin", ayat: "1 - 36" },
        { no: 84, name: "Al-Insyiqaq", ayat: "1 - 25" }, { no: 85, name: "Al-Buruj", ayat: "1 - 22" }, { no: 86, name: "At-Tariq", ayat: "1 - 17" },
        { no: 87, name: "Al-A'la", ayat: "1 - 19" }, { no: 88, name: "Al-Ghasyiyah", ayat: "1 - 26" }, { no: 89, name: "Al-Fajr", ayat: "1 - 30" },
        { no: 90, name: "Al-Balad", ayat: "1 - 20" }, { no: 91, name: "Asy-Syams", ayat: "1 - 15" }, { no: 92, name: "Al-Lail", ayat: "1 - 21" },
        { no: 93, name: "Ad-Duha", ayat: "1 - 11" }, { no: 94, name: "Al-Insyirah", ayat: "1 - 8" }, { no: 95, name: "At-Tin", ayat: "1 - 8" },
        { no: 96, name: "Al-'Alaq", ayat: "1 - 19" }, { no: 97, name: "Al-Qadr", ayat: "1 - 5" }, { no: 98, name: "Al-Bayyinah", ayat: "1 - 8" },
        { no: 99, name: "Az-Zalzalah", ayat: "1 - 8" }, { no: 100, name: "Al-'Adiyat", ayat: "1 - 11" }, { no: 101, name: "Al-Qari'ah", ayat: "1 - 11" },
        { no: 102, name: "At-Takasur", ayat: "1 - 8" }, { no: 103, name: "Al-'Asr", ayat: "1 - 3" }, { no: 104, name: "Al-Humazah", ayat: "1 - 9" },
        { no: 105, name: "Al-Fil", ayat: "1 - 5" }, { no: 106, name: "Quraisy", ayat: "1 - 4" }, { no: 107, name: "Al-Ma'un", ayat: "1 - 7" },
        { no: 108, name: "Al-Kausar", ayat: "1 - 3" }, { no: 109, name: "Al-Kafirun", ayat: "1 - 6" }, { no: 110, name: "An-Nasr", ayat: "1 - 3" },
        { no: 111, name: "Al-Lahab", ayat: "1 - 5" }, { no: 112, name: "Al-Ikhlas", ayat: "1 - 4" }, { no: 113, name: "Al-Falaq", ayat: "1 - 5" }, { no: 114, name: "An-Nas", ayat: "1 - 6" }
    ]
};

// HITUNG SELISIH PEKAN SEJAK EPOCH (START DATE: MINGGU 1 OKTOBER 2026)
const EPOCH_START_DATE = new Date("2026-10-05T00:00:00+07:00"); // Hari Senin Pertama

function getElapsedWeeks() {
    const now = new Date();
    const diffTime = now - EPOCH_START_DATE;
    if (diffTime < 0) return 0;
    return Math.floor(diffTime / (1000 * 60 * 60 * 24 * 7));
}

// FUNGSI PERGESERAN JUZ OTOMATIS
function getAssignedJuz(participantIndex) {
    const elapsedWeeks = getElapsedWeeks();
    return ((participantIndex - 1 + elapsedWeeks) % 30) + 1;
}

// SWITCH TAB UI
window.switchTab = function(tabId) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));

    const activeTab = document.getElementById(tabId);
    if (activeTab) activeTab.classList.remove('hidden');

    const btn = document.getElementById('btn' + tabId.charAt(0).toUpperCase() + tabId.slice(1));
    if (btn) btn.classList.add('active');
};

// RENDER COLOR WHEEL SVG (TAB 3)
function renderColorWheel() {
    const svg = document.getElementById('colorWheelSvg');
    if (!svg) return;

    svg.innerHTML = '';
    const cx = 250, cy = 250, rOuter = 230, rInner = 90;
    const totalSlices = 30;

    for (let i = 0; i < totalSlices; i++) {
        const juzNum = i + 1;
        const startAngle = (i * 360 / totalSlices) - 90;
        const endAngle = ((i + 1) * 360 / totalSlices) - 90;

        const x1 = cx + rOuter * Math.cos(Math.PI * startAngle / 180);
        const y1 = cy + rOuter * Math.sin(Math.PI * startAngle / 180);
        const x2 = cx + rOuter * Math.cos(Math.PI * endAngle / 180);
        const y2 = cy + rOuter * Math.sin(Math.PI * endAngle / 180);

        const x3 = cx + rInner * Math.cos(Math.PI * endAngle / 180);
        const y3 = cy + rInner * Math.sin(Math.PI * endAngle / 180);
        const x4 = cx + rInner * Math.cos(Math.PI * startAngle / 180);
        const y4 = cy + rInner * Math.sin(Math.PI * startAngle / 180);

        const hue = (i * 360 / 30);
        const pathData = `M ${x1} ${y1} A ${rOuter} ${rOuter} 0 0 1 ${x2} ${y2} L ${x3} ${y3} A ${rInner} ${rInner} 0 0 0 ${x4} ${y4} Z`;

        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", pathData);
        path.setAttribute("fill", `hsl(${hue}, 85%, 50%)`);
        path.setAttribute("class", "wheel-slice");

        path.addEventListener("mouseenter", () => {
            const hoverInfo = document.getElementById("wheelHoverInfo");
            if (hoverInfo) {
                hoverInfo.innerHTML = `<strong>JUZ ${juzNum}</strong> | Status: Progres Aktif Pekan Ini`;
            }
        });

        svg.appendChild(path);
    }
}

// INSIALISASI TILAWAH DASHBOARD Saat Auth Ready
window.initTilawahDashboard = function(user, namaPanggilan) {
    renderColorWheel();
    const weekNum = getElapsedWeeks() + 1;
    const badge = document.getElementById("currentWeekBadge");
    if (badge) badge.innerText = `Minggu ke-${weekNum} (Oktober 2026)`;

    if (user) {
        // Tampilkan Juz 30 sebagai sampel aktif untuk user yang login (misal Nana Ocin)
        const targetJuz = 30; 
        const userTitle = document.getElementById("userJuzTitle");
        const userName = document.getElementById("userNameDisplay");
        if (userTitle) userTitle.innerText = `JUZ ${targetJuz}`;
        if (userName) userName.innerText = namaPanggilan || "NANA OCIN";

        renderSurahGrid(targetJuz);
    }
};

// RENDER GRID KOTAK SURAT (SAMPEL TAMPILAN JUZ 30)
function renderSurahGrid(juzNumber) {
    const grid = document.getElementById("surahGridContainer");
    if (!grid) return;

    const surahs = QURAN_JUZ_DATA[juzNumber] || [];
    grid.innerHTML = "";

    let completedCount = 0;

    surahs.forEach((s, idx) => {
        const card = document.createElement("div");
        card.className = "surah-card";
        
        // Simulasi status checklist (misal beberapa surat diawal selesai)
        if (idx < 12) {
            card.classList.add("completed");
            completedCount++;
        }

        card.innerHTML = `
            <div class="surah-number">${s.no}</div>
            <div class="surah-info">
                <div>${s.name}</div>
                <div class="text-[10px] opacity-75">ayat ${s.ayat}</div>
            </div>
        `;

        card.addEventListener("click", () => {
            card.classList.toggle("completed");
            updateProgressBar(surahs.length);
        });

        grid.appendChild(card);
    });

    updateProgressBar(surahs.length);
}

function updateProgressBar(totalSurahs) {
    const completed = document.querySelectorAll(".surah-card.completed").length;
    const percent = Math.round((completed / totalSurahs) * 100);

    const percentText = document.getElementById("userProgressPercent");
    const progressBar = document.getElementById("userProgressBar");

    if (percentText) percentText.innerText = `${percent}%`;
    if (progressBar) progressBar.style.width = `${percent}%`;
}

// FUNGSI UTAMA RENDER 30 CARD JUZ DALAM TAB 2
function renderAll30JuzCards(currentUser) {
    const container = document.getElementById("juzGrid30Container");
    if (!container) return;

    container.innerHTML = "";

    // Loop dari Juz 1 sampai Juz 30
    for (let juzNum = 1; juzNum <= 30; juzNum++) {
        const surahs = QURAN_JUZ_DATA[juzNum] || [];
        
        // Simulasi Nama Peserta Penanggung Jawab Juz Pekan Ini
        const assignedName = "NANA OCIN"; 
        const isUserAssigned = (juzNum === 30); // Contoh: User sedang login bertugas di Juz 30

        // LOGIKA BACKGROUND SELANG-SELING:
        // Jika juzNum Ganjil (1, 3, 5...) -> lt-tilawah-dark.webp
        // Jika juzNum Genap (2, 4, 6...)  -> lt-tilawah-lite.webp
        const bgClass = (juzNum % 2 !== 0) ? 'juz-card-bg-dark' : 'juz-card-bg-lite';

        const card = document.createElement("div");
        card.className = `juz-card-box ${bgClass} ${isUserAssigned ? 'user-assigned' : ''}`;

        // Header Card (Juz Number, Nama Peserta, Periode)
        let htmlContent = `
            <div>
                <div class="flex justify-between items-start mb-2">
                    <h2 class="text-3xl md:text-4xl font-extralight tracking-tight text-white">JUZ ${juzNum}</h2>
                    <div class="text-[10px] opacity-80 text-right">
                        <div>Minggu ke-4</div>
                        <div>Bulan Oktober 2026</div>
                    </div>
                </div>
                <h3 class="text-xl font-bold mb-4 tracking-wide">${assignedName}</h3>

                <!-- GRID SURAT-SURAT DALAM JUZ -->
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
        `;

        // Render Kotak Surat dalam Juz Ini
        surahs.forEach((s, idx) => {
            const isCompleted = (idx % 2 === 0); // Simulasi status tercentang
            htmlContent += `
                <div class="surah-card ${isCompleted ? 'completed' : ''}" onclick="toggleSurahCheck(this, ${juzNum}, ${s.no})">
                    <div class="surah-number">${s.no}</div>
                    <div class="surah-info truncate">
                        <div class="truncate">${s.name}</div>
                        <div class="text-[9px] opacity-75">ayat ${s.ayat}</div>
                    </div>
                </div>
            `;
        });

        htmlContent += `
                </div>
            </div>

            <!-- PROGRESS BAR CARD -->
            <div class="space-y-1 pt-2 border-t border-white/20">
                <div class="flex justify-between text-[11px] font-semibold opacity-90">
                    <span>Progres Bacaan/minggu/juz</span>
                    <span class="text-amber-400 font-bold">35%</span>
                </div>
                <div class="w-full bg-slate-900/60 h-3 rounded-full overflow-hidden p-0.5 border border-white/20">
                    <div class="bg-white h-full rounded-full transition-all duration-300" style="width: 35%"></div>
                </div>
            </div>
        `;

        card.innerHTML = htmlContent;
        container.appendChild(card);
    }
}

// TOGGLE CHECKLIST SURAT
window.toggleSurahCheck = function(element, juzNum, surahNo) {
    element.classList.toggle("completed");
    // Di sini nantinya tersambung ke Firebase Firestore untuk menyimpan progres real-time
};

// Inisialisasi saat Auth Ready
window.initTilawahDashboard = function(user, namaPanggilan) {
    renderColorWheel();
    renderAll30JuzCards(user);
};