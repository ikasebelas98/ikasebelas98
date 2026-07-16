console.log("navbar.js loaded");

const navItem = document.querySelector("#tentang-kita");

if (navItem) {

    console.log("Tentang Kita ditemukan");

    navItem.addEventListener("mouseenter", () => {

        console.log("OPEN");

        document.body.classList.add("mega-open");

    });

    navItem.addEventListener("mouseleave", () => {

        console.log("CLOSE");

        document.body.classList.remove("mega-open");

    });

} else {

    console.log("ERROR: #tentang-kita tidak ditemukan");

}