document.addEventListener("DOMContentLoaded", () => {
    // 1. FUNGSI LIVE CLOCK & TANGGAL REALTIME
    function updateLiveDateTime() {
        const now = new Date();

        // Format Hari dan Tanggal Bahasa Indonesia
        const optionsDate = { 
            weekday: 'long', 
            day: 'numeric', 
            month: 'short', 
            year: 'numeric' 
        };
        const dateString = now.toLocaleDateString('id-ID', optionsDate);

        // Format Jam, Menit, Detik
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        const timeString = `${hours}:${minutes}:${seconds} WIB`;

        const dateEl = document.getElementById("liveDayDate");
        const clockEl = document.getElementById("liveClock");

        if (dateEl) dateEl.innerText = dateString.toUpperCase();
        if (clockEl) clockEl.innerText = timeString;
    }

    // Jalankan jam pertama kali & update setiap 1 detik (1000ms)
    updateLiveDateTime();
    setInterval(updateLiveDateTime, 1000);

    // 2. FUNGSI VISITOR COUNTER API
    const namespace = "ikasebelas98";
    const key = "visits";

    fetch(`https://api.counterapi.dev/v1/up/${namespace}/${key}`)
        .then(response => {
            if (!response.ok) {
                return fetch(`https://api.counterapi.dev/v1/${namespace}/${key}/up`);
            }
            return response;
        })
        .then(response => response.json())
        .then(data => {
            const count = data.count || data.value || 0;
            const formattedNumber = String(count).padStart(6, '0');
            const visitorEl = document.getElementById("visitorCount");
            if (visitorEl) visitorEl.innerText = formattedNumber;
        })
        .catch(err => {
            console.error("Counter Error:", err);
            const visitorEl = document.getElementById("visitorCount");
            if (visitorEl) visitorEl.innerText = "000001";
        });
});