import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc, updateDoc, increment } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCQPbOs9mN3TIW9SkBsPM6y0MjJmlhBfgc",
  authDomain: "ikasebelas98-96595.firebaseapp.com",
  projectId: "ikasebelas98-96595",
  storageBucket: "ikasebelas98-96595.firebasestorage.app",
  messagingSenderId: "142033224407",
  appId: "1:142033224407:web:21a6cd2305c75c1deee692",
  measurementId: "G-W486XXJVBX"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.addEventListener("DOMContentLoaded", () => {
    // 1. LIVE CLOCK & TANGGAL REALTIME
    function updateLiveDateTime() {
        const now = new Date();
        const optionsDate = { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' };
        const dateString = now.toLocaleDateString('id-ID', optionsDate);

        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        const timeString = `${hours}:${minutes}:${seconds} WIB`;

        const dateEl = document.getElementById("liveDayDate");
        const clockEl = document.getElementById("liveClock");

        if (dateEl) dateEl.innerText = dateString.toUpperCase();
        if (clockEl) clockEl.innerText = timeString;
    }

    updateLiveDateTime();
    setInterval(updateLiveDateTime, 1000);

    // 2. FIREBASE FIRESTORE VISITOR COUNTER
    async function trackVisitor() {
        try {
            const visitorRef = doc(db, "settings", "visitor_counter");
            const visitorSnap = await getDoc(visitorRef);

            let currentCount = 1;

            if (visitorSnap.exists()) {
                // Jika dokumen sudah ada, tambahkan 1
                await updateDoc(visitorRef, {
                    count: increment(1)
                });
                currentCount = visitorSnap.data().count + 1;
            } else {
                // Jika dokumen belum ada, buat baru mulai dari 1
                await setDoc(visitorRef, { count: 1 });
            }

            // Format ke 6 digit (contoh: 000001)
            const formattedNumber = String(currentCount).padStart(6, '0');
            const visitorEl = document.getElementById("visitorCount");
            if (visitorEl) visitorEl.innerText = formattedNumber;

        } catch (err) {
            console.error("Firebase Counter Error:", err);
            const visitorEl = document.getElementById("visitorCount");
            if (visitorEl) visitorEl.innerText = "000001";
        }
    }

    trackVisitor();
});