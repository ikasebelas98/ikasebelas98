document.addEventListener("DOMContentLoaded", () => {
    // Kunci unik website kamu (ganti 'namawebsitekamu' dengan nama domain/web kamu)
    const namespace = "namawebsitekamu.com";
    const key = "visits";

    fetch(`https://api.countapi.xyz/hit/${namespace}/${key}`)
        .then(response => response.json())
        .then(data => {
            // Format angka agar ada 0 di depan (misal: 001250) biar kelihatan keren
            const formattedNumber = String(data.value).padStart(6, '0');
            document.getElementById("visitorCount").innerText = formattedNumber;
        })
        .catch(err => {
            // Jika API offline, tampilkan angka default buat gaya-gayaan
            document.getElementById("visitorCount").innerText = "001234";
        });
});