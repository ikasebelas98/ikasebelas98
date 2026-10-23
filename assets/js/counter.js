import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc, updateDoc, increment } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBSuusyB8UmVN721It89xqgfxZf8swB6gk",
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

    // 2. FIREBASE FIRESTORE VISITOR COUNTER DENGAN SESSION STORAGE
    async function trackVisitor() {
        try {
            const visitorRef = doc(db, "settings", "visitor_counter");
            const visitorSnap = await getDoc(visitorRef);

            let currentCount = visitorSnap.exists() ? visitorSnap.data().count : 0;
            const visitorEl = document.getElementById("visitorCount");

            // Cek apakah tab browser ini sudah mencatat kunjungan di sesi aktif
            if (!sessionStorage.getItem("visited_session")) {
                if (visitorSnap.exists()) {
                    await updateDoc(visitorRef, {
                        count: increment(1)
                    });
                    currentCount += 1;
                } else {
                    await setDoc(visitorRef, { count: 1 });
                    currentCount = 1;
                }
                // Tandai bahwa sesi ini sudah dihitung
                sessionStorage.setItem("visited_session", "true");
            }

            // Tampilkan angka visitor ke layar (format 9 digit)
            if (visitorEl) {
                visitorEl.innerText = String(currentCount).padStart(9, '0');
            }

        } catch (err) {
            console.error("Firebase Counter Error:", err);
            const visitorEl = document.getElementById("visitorCount");
            if (visitorEl) visitorEl.innerText = "000000001";
        }
    }

    trackVisitor();
});