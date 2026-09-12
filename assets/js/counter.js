document.addEventListener("DOMContentLoaded", () => {
    // Kita gunakan endpoint V2 resmi yang aktif
    const namespace = "ikasebelas98";
    const key = "visits";

    fetch(`https://api.counterapi.dev/v1/up/${namespace}/${key}`)
        .then(response => {
            if (!response.ok) {
                // Jika key belum terdaftar di API v2, buat otomatis lewat endpoint hit
                return fetch(`https://api.counterapi.dev/v1/${namespace}/${key}/up`);
            }
            return response;
        })
        .then(response => response.json())
        .then(data => {
            // Ambil nilai count dari response API
            const count = data.count || data.value || 0;
            const formattedNumber = String(count).padStart(6, '0');
            document.getElementById("visitorCount").innerText = formattedNumber;
        })
        .catch(err => {
            console.error("Counter Error:", err);
            // Angka default jika offline
            document.getElementById("visitorCount").innerText = "000001";
        });
});